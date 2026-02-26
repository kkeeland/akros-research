import { Bot } from "grammy";
import Anthropic from "@anthropic-ai/sdk";
import { execSync } from "child_process";
import https from "https";
import http from "http";

// === Config ===
const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
const MEDUSA_URL = process.env.MEDUSA_URL || "http://localhost:9000";
const MEDUSA_EMAIL = process.env.MEDUSA_ADMIN_EMAIL || "admin@akroresearch.com";
const MEDUSA_PASS = process.env.MEDUSA_ADMIN_PASSWORD || "akro-admin-2025";
const BEADS_DIR = process.env.BEADS_DIR || "/opt/projects/akro-storefront";
const BOT_USERNAME = process.env.BOT_USERNAME || "akro_bot";

if (!TELEGRAM_TOKEN) throw new Error("TELEGRAM_BOT_TOKEN required");
if (!ANTHROPIC_KEY) throw new Error("ANTHROPIC_API_KEY required");

// === Medusa API ===
let medusaToken = null;

async function medusaAuth() {
  const resp = await fetchJSON("POST", `${MEDUSA_URL}/auth/user/emailpass`, {
    email: MEDUSA_EMAIL,
    password: MEDUSA_PASS,
  });
  medusaToken = resp.token;
  return medusaToken;
}

async function medusaAPI(method, endpoint, body) {
  if (!medusaToken) await medusaAuth();
  try {
    return await fetchJSON(method, `${MEDUSA_URL}${endpoint}`, body, {
      Authorization: `Bearer ${medusaToken}`,
    });
  } catch (e) {
    await medusaAuth();
    return await fetchJSON(method, `${MEDUSA_URL}${endpoint}`, body, {
      Authorization: `Bearer ${medusaToken}`,
    });
  }
}

function fetchJSON(method, url, body, extraHeaders = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const mod = u.protocol === "https:" ? https : http;
    const opts = {
      hostname: u.hostname,
      port: u.port,
      path: u.pathname + u.search,
      method,
      headers: { "Content-Type": "application/json", ...extraHeaders },
    };
    const req = mod.request(opts, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); }
        catch { resolve({ raw: data }); }
      });
    });
    req.on("error", reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// === Beads CLI ===
function bd(cmd) {
  try {
    return execSync(`cd ${BEADS_DIR} && bd ${cmd}`, {
      encoding: "utf8",
      timeout: 10000,
    }).trim();
  } catch (e) {
    return `Error: ${e.stderr || e.message}`;
  }
}

// === Medusa Tools for Claude ===
const TOOLS = [
  {
    name: "medusa_get_products",
    description: "List all products. Returns titles, handles, variants, status.",
    input_schema: { type: "object", properties: { limit: { type: "number" } } },
  },
  {
    name: "medusa_get_product",
    description: "Get details for a single product by ID.",
    input_schema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] },
  },
  {
    name: "medusa_update_product",
    description: "Update a product. REQUIRES CONFIRMATION FIRST.",
    input_schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        fields: { type: "object", description: "Fields to update" },
      },
      required: ["id", "fields"],
    },
  },
  {
    name: "medusa_get_orders",
    description: "List recent orders.",
    input_schema: { type: "object", properties: { limit: { type: "number" }, status: { type: "string" } } },
  },
  {
    name: "medusa_get_order",
    description: "Get full order details by ID.",
    input_schema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] },
  },
  {
    name: "medusa_get_inventory",
    description: "List inventory items with stock levels and SKUs.",
    input_schema: { type: "object", properties: { limit: { type: "number" } } },
  },
  {
    name: "medusa_update_inventory",
    description: "Update stock level. REQUIRES CONFIRMATION FIRST.",
    input_schema: {
      type: "object",
      properties: {
        inventory_item_id: { type: "string" },
        location_id: { type: "string" },
        stocked_quantity: { type: "number" },
      },
      required: ["inventory_item_id", "stocked_quantity"],
    },
  },
  {
    name: "medusa_get_customers",
    description: "List customers.",
    input_schema: { type: "object", properties: { limit: { type: "number" } } },
  },
  {
    name: "medusa_get_collections",
    description: "List product collections.",
    input_schema: { type: "object", properties: {} },
  },
  {
    name: "medusa_get_categories",
    description: "List product categories.",
    input_schema: { type: "object", properties: {} },
  },
  {
    name: "beads_list",
    description: "List beads tasks. Shows epics, tasks, subtasks with status.",
    input_schema: { type: "object", properties: { filter: { type: "string", description: "ready, open, closed, all" } } },
  },
  {
    name: "beads_create",
    description: "Create a bead (epic/task/subtask). ALWAYS create beads for work requests. Use --parent to nest under an epic.",
    input_schema: {
      type: "object",
      properties: {
        title: { type: "string" },
        type: { type: "string", description: "epic, task, feature, bug, chore, decision" },
        priority: { type: "number", description: "0=critical, 1=high, 2=medium, 3=low" },
        parent: { type: "string", description: "Parent bead ID for subtasks" },
        description: { type: "string" },
      },
      required: ["title"],
    },
  },
  {
    name: "beads_update",
    description: "Update bead status (open, in_progress, closed, blocked).",
    input_schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        status: { type: "string", description: "open, in_progress, closed, blocked" },
        notes: { type: "string", description: "Additional notes to append" },
        title: { type: "string", description: "New title" },
        type: { type: "string", description: "bug, feature, task, epic, chore, decision" },
      },
      required: ["id"],
    },
  },
  {
    name: "beads_show",
    description: "Show bead details with history and dependencies.",
    input_schema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] },
  },
];

// === Tool Executor ===
async function executeTool(name, input) {
  switch (name) {
    case "medusa_get_products": {
      const data = await medusaAPI("GET", `/admin/products?limit=${input.limit || 20}`);
      return JSON.stringify((data.products || []).map((p) => ({
        id: p.id, title: p.title, handle: p.handle, status: p.status,
        variants: (p.variants || []).map((v) => ({ id: v.id, title: v.title, sku: v.sku })),
      })));
    }
    case "medusa_get_product": {
      const data = await medusaAPI("GET", `/admin/products/${input.id}`);
      return JSON.stringify(data.product || data);
    }
    case "medusa_update_product": {
      const data = await medusaAPI("POST", `/admin/products/${input.id}`, input.fields);
      return JSON.stringify({ success: !!data.product, title: data.product?.title });
    }
    case "medusa_get_orders": {
      const params = new URLSearchParams({ limit: String(input.limit || 10) });
      if (input.status) params.set("status", input.status);
      const data = await medusaAPI("GET", `/admin/orders?${params}`);
      return JSON.stringify((data.orders || []).map((o) => ({
        id: o.id, display_id: o.display_id, status: o.status,
        total: o.total, email: o.email, created_at: o.created_at,
      })));
    }
    case "medusa_get_order": {
      const data = await medusaAPI("GET", `/admin/orders/${input.id}`);
      return JSON.stringify(data.order || data);
    }
    case "medusa_get_inventory": {
      const data = await medusaAPI("GET", `/admin/inventory-items?limit=${input.limit || 50}`);
      return JSON.stringify((data.inventory_items || []).map((i) => ({
        id: i.id, title: i.title, sku: i.sku,
        stock: (i.location_levels || []).map((l) => ({ stocked: l.stocked_quantity, reserved: l.reserved_quantity })),
      })));
    }
    case "medusa_update_inventory": {
      const inv = await medusaAPI("GET", `/admin/inventory-items/${input.inventory_item_id}`);
      const locId = input.location_id || inv.inventory_item?.location_levels?.[0]?.location_id;
      if (!locId) return JSON.stringify({ error: "No location found" });
      const data = await medusaAPI("POST",
        `/admin/inventory-items/${input.inventory_item_id}/location-levels/${locId}`,
        { stocked_quantity: input.stocked_quantity });
      return JSON.stringify({ success: true });
    }
    case "medusa_get_customers": {
      const data = await medusaAPI("GET", `/admin/customers?limit=${input.limit || 20}`);
      return JSON.stringify(data.customers || []);
    }
    case "medusa_get_collections": {
      const data = await medusaAPI("GET", `/admin/collections?limit=20`);
      return JSON.stringify((data.collections || []).map((c) => ({ id: c.id, title: c.title, handle: c.handle })));
    }
    case "medusa_get_categories": {
      const data = await medusaAPI("GET", `/admin/product-categories?limit=20`);
      return JSON.stringify((data.product_categories || []).map((c) => ({ id: c.id, name: c.name, handle: c.handle })));
    }
    case "beads_list":
      return bd(`list 2>&1`) || "No tasks found.";
    case "beads_create": {
      let cmd = `create "${input.title.replace(/"/g, '\\"')}"`;
      if (input.type) cmd += ` -t ${input.type}`;
      if (input.priority !== undefined) cmd += ` -p ${input.priority}`;
      if (input.parent) cmd += ` --parent ${input.parent}`;
      if (input.description) cmd += ` -d "${input.description.replace(/"/g, '\\"')}"`;
      return bd(cmd);
    }
    case "beads_update": {
      let cmd = `update ${input.id}`;
      if (input.status) cmd += ` -s ${input.status}`;
      if (input.notes) cmd += ` --notes "${input.notes.replace(/"/g, '\\"')}"`;
      if (input.title) cmd += ` --title "${input.title.replace(/"/g, '\\"')}"`;
      if (input.type) cmd += ` -t ${input.type}`;
      return bd(cmd);
    }
    case "beads_show":
      return bd(`show ${input.id}`);
    default:
      return JSON.stringify({ error: `Unknown tool: ${name}` });
  }
}

// === Pending confirmations ===
const pendingConfirmations = new Map();

// === Claude Agent ===
const claude = new Anthropic({ apiKey: ANTHROPIC_KEY });

const SYSTEM_PROMPT = `You are the AKRO Research admin bot on Telegram. You manage the AKRO Research e-commerce store (peptides & research compounds).

## CRITICAL RULES
1. **ALWAYS CONFIRM** before ANY write operation. Present exactly what you will change and ask the user to reply YES to confirm.
2. **Track ALL work** with beads. For any change request:
   - Create an Epic first for the overall request
   - Break into Tasks and Subtasks
   - Update status as you work
3. Be concise. Use Telegram markdown.
4. When listing data, format it cleanly with bullet points or tables.

## Beads Hierarchy
- Epic: "Restock low inventory items" (bd-xxxx)
  - Task: "Update BPC-157 stock" (bd-xxxx.1)
    - Subtask: "Set 10mg variant to 500" (bd-xxxx.1.1)

## Store Info
- 36 peptide/research products across 6 categories: Peptides, Blends, GLP-1, Growth, Nootropics, Longevity
- US (USD) and Europe (EUR) regions
- SKUs follow format: AKRO-PRODUCT-DOSE`;

async function handleMessage(chatId, userMessage, userName, sendReply) {
  const messages = [{ role: "user", content: `[From: ${userName}] ${userMessage}` }];
  let iterations = 0;

  while (iterations < 8) {
    iterations++;
    const response = await claude.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      tools: TOOLS,
      messages,
    });

    let textParts = [];
    let toolCalls = [];

    for (const block of response.content) {
      if (block.type === "text" && block.text) textParts.push(block.text);
      else if (block.type === "tool_use") toolCalls.push(block);
    }

    if (textParts.length > 0) {
      const text = textParts.join("\n");
      // Split long messages (Telegram 4096 char limit)
      for (let i = 0; i < text.length; i += 4000) {
        await sendReply(text.slice(i, i + 4000));
      }
    }

    if (toolCalls.length === 0 || response.stop_reason === "end_turn") break;

    // Check for write operations that need confirmation
    const writeOps = toolCalls.filter((tc) =>
      ["medusa_update_product", "medusa_update_inventory"].includes(tc.name)
    );

    if (writeOps.length > 0) {
      pendingConfirmations.set(chatId, {
        toolCalls,
        messages: [...messages, { role: "assistant", content: response.content }],
        timestamp: Date.now(),
      });
      return; // Wait for YES/NO
    }

    // Execute read-only tools
    const toolResults = [];
    for (const tc of toolCalls) {
      const result = await executeTool(tc.name, tc.input);
      toolResults.push({ type: "tool_result", tool_use_id: tc.id, content: result });
    }
    messages.push({ role: "assistant", content: response.content });
    messages.push({ role: "user", content: toolResults });
  }
}

async function handleConfirmation(chatId, confirmed, sendReply) {
  const pending = pendingConfirmations.get(chatId);
  if (!pending) return sendReply("No pending action.");
  pendingConfirmations.delete(chatId);

  if (!confirmed) return sendReply("Cancelled.");

  const toolResults = [];
  for (const tc of pending.toolCalls) {
    const result = await executeTool(tc.name, tc.input);
    toolResults.push({ type: "tool_result", tool_use_id: tc.id, content: result });
  }

  const messages = [...pending.messages, { role: "user", content: toolResults }];
  const response = await claude.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    tools: TOOLS,
    messages,
  });

  for (const block of response.content) {
    if (block.type === "text" && block.text) await sendReply(block.text);
  }
}

// === Telegram Bot ===
const bot = new Bot(TELEGRAM_TOKEN);

bot.on("message:text", async (ctx) => {
  const text = ctx.message.text;
  const chat = ctx.chat;
  const userName = ctx.from?.first_name || ctx.from?.username || "User";

  // In groups, require @ mention or reply to bot
  if (chat.type === "group" || chat.type === "supergroup") {
    const mentionsBot =
      text.includes(`@${BOT_USERNAME}`) ||
      (ctx.message.entities || []).some(
        (e) => e.type === "mention" && text.slice(e.offset, e.offset + e.length) === `@${BOT_USERNAME}`
      ) ||
      ctx.message.reply_to_message?.from?.id === ctx.me.id;
    if (!mentionsBot) return;
  }

  const cleanText = text.replace(new RegExp(`@${BOT_USERNAME}`, "g"), "").trim();

  // Confirmation check
  if (pendingConfirmations.has(chat.id)) {
    const lower = cleanText.toLowerCase();
    if (["yes", "y", "confirm"].includes(lower)) {
      return handleConfirmation(chat.id, true, (msg) =>
        ctx.reply(msg, { parse_mode: "Markdown" }).catch(() => ctx.reply(msg)));
    }
    if (["no", "n", "cancel"].includes(lower)) {
      return handleConfirmation(chat.id, false, (msg) =>
        ctx.reply(msg, { parse_mode: "Markdown" }).catch(() => ctx.reply(msg)));
    }
  }

  try {
    await ctx.replyWithChatAction("typing");
    await handleMessage(chat.id, cleanText, userName, (msg) =>
      ctx.reply(msg, { parse_mode: "Markdown" }).catch(() => ctx.reply(msg)));
  } catch (err) {
    console.error("Error:", err);
    await ctx.reply(`Error: ${err.message}`);
  }
});

// Cleanup stale confirmations
setInterval(() => {
  const now = Date.now();
  for (const [k, v] of pendingConfirmations) {
    if (now - v.timestamp > 5 * 60 * 1000) pendingConfirmations.delete(k);
  }
}, 60000);

console.log("AKRO Bot starting...");
bot.start({ onStart: (info) => console.log(`Bot @${info.username} running!`) });
