import { CreateInventoryLevelInput, ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
} from "@medusajs/medusa/core-flows";

export default async function seedProducts({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);

  // Get existing sales channel
  const defaultSalesChannel = await salesChannelModuleService.listSalesChannels(
    { name: "Default Sales Channel" }
  );
  if (!defaultSalesChannel.length) {
    throw new Error(
      "Default Sales Channel not found. Run the main seed script first."
    );
  }
  const salesChannelId = defaultSalesChannel[0].id;

  // Get existing shipping profile
  const shippingProfiles =
    await fulfillmentModuleService.listShippingProfiles({ type: "default" });
  if (!shippingProfiles.length) {
    throw new Error(
      "Default Shipping Profile not found. Run the main seed script first."
    );
  }
  const shippingProfileId = shippingProfiles[0].id;

  // Get existing stock location
  const { data: stockLocations } = await query.graph({
    entity: "stock_location",
    fields: ["id"],
  });
  if (!stockLocations.length) {
    throw new Error("Stock location not found. Run the main seed script first.");
  }
  const stockLocationId = stockLocations[0].id;

  // --- Create Product Categories ---
  logger.info("Seeding product categories...");
  const { result: categoryResult } = await createProductCategoriesWorkflow(
    container
  ).run({
    input: {
      product_categories: [
        { name: "GLP-1", is_active: true },
        { name: "Growth Hormone", is_active: true },
        { name: "Nootropic", is_active: true },
        { name: "Longevity", is_active: true },
        { name: "Performance", is_active: true },
        { name: "Misc", is_active: true },
      ],
    },
  });

  const catId = (name: string) =>
    categoryResult.find((c) => c.name === name)!.id;

  logger.info("Finished seeding product categories.");

  // --- Helper to build a product ---
  function buildProduct(
    name: string,
    handle: string,
    description: string,
    categoryName: string,
    variants: { strength: string; sku: string; price: number }[]
  ) {
    const strengthValues = variants.map((v) => v.strength);
    return {
      title: name,
      handle,
      description,
      category_ids: [catId(categoryName)],
      weight: 100,
      status: ProductStatus.PUBLISHED,
      shipping_profile_id: shippingProfileId,
      options: [
        {
          title: "Strength",
          values: strengthValues,
        },
      ],
      variants: variants.map((v) => ({
        title: `${name} ${v.strength}`,
        sku: v.sku,
        options: { Strength: v.strength },
        manage_inventory: true,
        prices: [
          {
            amount: v.price,
            currency_code: "usd",
          },
        ],
      })),
      sales_channels: [{ id: salesChannelId }],
    };
  }

  // --- Define all products ---
  const products = [
    // ===== GLP-1 =====
    buildProduct(
      "Semaglutide",
      "semaglutide",
      "GLP-1 receptor agonist available in lyophilized powder form for research purposes.",
      "GLP-1",
      [
        { strength: "5mg", sku: "GLP1-SEMA-5MG", price: 9000 },
        { strength: "10mg", sku: "GLP1-SEMA-10MG", price: 12000 },
        { strength: "15mg", sku: "GLP1-SEMA-15MG", price: 18000 },
        { strength: "20mg", sku: "GLP1-SEMA-20MG", price: 21000 },
      ]
    ),
    buildProduct(
      "Tirzepatide",
      "tirzepatide",
      "Dual GIP and GLP-1 receptor agonist available in lyophilized powder form for research purposes.",
      "GLP-1",
      [
        { strength: "10mg", sku: "GLP1-TIRZ-10MG", price: 18000 },
        { strength: "15mg", sku: "GLP1-TIRZ-15MG", price: 19500 },
        { strength: "20mg", sku: "GLP1-TIRZ-20MG", price: 21000 },
        { strength: "30mg", sku: "GLP1-TIRZ-30MG", price: 22500 },
        { strength: "60mg", sku: "GLP1-TIRZ-60MG", price: 30000 },
      ]
    ),
    buildProduct(
      "Retatrutide",
      "retatrutide",
      "Triple agonist targeting GIP, GLP-1, and glucagon receptors. Available in lyophilized powder form for research purposes.",
      "GLP-1",
      [
        { strength: "5mg", sku: "GLP1-RETA-5MG", price: 16500 },
        { strength: "10mg", sku: "GLP1-RETA-10MG", price: 18000 },
        { strength: "20mg", sku: "GLP1-RETA-20MG", price: 30000 },
        { strength: "30mg", sku: "GLP1-RETA-30MG", price: 37500 },
      ]
    ),
    buildProduct(
      "Cagrilintide",
      "cagrilintide",
      "Long-acting amylin analog available in lyophilized powder form for research purposes.",
      "GLP-1",
      [{ strength: "10mg", sku: "GLP1-CAGR-10MG", price: 30000 }]
    ),

    // ===== Growth Hormone =====
    buildProduct(
      "HGH",
      "hgh",
      "Human Growth Hormone available in lyophilized powder form for research purposes.",
      "Growth Hormone",
      [
        { strength: "10iu", sku: "GH-HGH-10IU", price: 10500 },
        { strength: "15iu", sku: "GH-HGH-15IU", price: 15000 },
      ]
    ),
    buildProduct(
      "CJC-1295 With DAC",
      "cjc-1295-with-dac",
      "Growth hormone releasing hormone analog with Drug Affinity Complex for extended half-life. Available in lyophilized powder form for research purposes.",
      "Growth Hormone",
      [{ strength: "5mg", sku: "GH-CJC1295DAC-5MG", price: 24000 }]
    ),
    buildProduct(
      "CJC-1295 Without DAC",
      "cjc-1295-without-dac",
      "Growth hormone releasing hormone analog (Mod GRF 1-29). Available in lyophilized powder form for research purposes.",
      "Growth Hormone",
      [{ strength: "5mg", sku: "GH-CJC1295-5MG", price: 12000 }]
    ),
    buildProduct(
      "CJC-1295 Without DAC + IPA",
      "cjc-1295-without-dac-ipa",
      "Combination of CJC-1295 (Mod GRF 1-29) and Ipamorelin blend. Available in lyophilized powder form for research purposes.",
      "Growth Hormone",
      [{ strength: "10mg", sku: "GH-CJC1295IPA-10MG", price: 15000 }]
    ),
    buildProduct(
      "Ipamorelin",
      "ipamorelin",
      "Selective growth hormone secretagogue peptide. Available in lyophilized powder form for research purposes.",
      "Growth Hormone",
      [{ strength: "10mg", sku: "GH-IPA-10MG", price: 10500 }]
    ),
    buildProduct(
      "Sermorelin Acetate",
      "sermorelin-acetate",
      "Growth hormone releasing hormone analog. Available in lyophilized powder form for research purposes.",
      "Growth Hormone",
      [{ strength: "5mg", sku: "GH-SERM-5MG", price: 9000 }]
    ),
    buildProduct(
      "Tesamorelin",
      "tesamorelin",
      "Synthetic growth hormone releasing hormone analog. Available in lyophilized powder form for research purposes.",
      "Growth Hormone",
      [{ strength: "10mg", sku: "GH-TESA-10MG", price: 24000 }]
    ),
    buildProduct(
      "AOD 9604",
      "aod-9604",
      "Modified fragment of human growth hormone (HGH fragment 176-191). Available in lyophilized powder form for research purposes.",
      "Growth Hormone",
      [{ strength: "5mg", sku: "GH-AOD9604-5MG", price: 13500 }]
    ),

    // ===== Nootropic =====
    buildProduct(
      "Semax",
      "semax",
      "Synthetic peptide derived from ACTH (4-10) fragment. Available in lyophilized powder form for research purposes.",
      "Nootropic",
      [{ strength: "10mg", sku: "NOOT-SEMAX-10MG", price: 12000 }]
    ),
    buildProduct(
      "Selank",
      "selank",
      "Synthetic analog of immunomodulatory peptide tuftsin. Available in lyophilized powder form for research purposes.",
      "Nootropic",
      [{ strength: "10mg", sku: "NOOT-SELANK-10MG", price: 13500 }]
    ),
    buildProduct(
      "Pinealon",
      "pinealon",
      "Short regulatory peptide (Glu-Asp-Arg) with bioregulatory properties. Available in lyophilized powder form for research purposes.",
      "Nootropic",
      [{ strength: "20mg", sku: "NOOT-PINEALON-20MG", price: 27000 }]
    ),
    buildProduct(
      "Cerebrolysin",
      "cerebrolysin",
      "Neuropeptide preparation with neurotrophic properties. Available for research purposes.",
      "Nootropic",
      [{ strength: "60mg", sku: "NOOT-CEREBRO-60MG", price: 12000 }]
    ),
    buildProduct(
      "FOXO4",
      "foxo4",
      "FOXO4-DRI peptide for senolytic research. Available in lyophilized powder form for research purposes.",
      "Nootropic",
      [{ strength: "10mg", sku: "NOOT-FOXO4-10MG", price: 45000 }]
    ),
    buildProduct(
      "LC216",
      "lc216",
      "Research compound available in liquid form for research purposes.",
      "Nootropic",
      [{ strength: "10ml", sku: "NOOT-LC216-10ML", price: 15000 }]
    ),

    // ===== Longevity =====
    buildProduct(
      "Epithalon",
      "epithalon",
      "Synthetic tetrapeptide (Ala-Glu-Asp-Gly) studied for telomerase activation. Available in lyophilized powder form for research purposes.",
      "Longevity",
      [{ strength: "10mg", sku: "LONG-EPITH-10MG", price: 9000 }]
    ),
    buildProduct(
      "Thymalin",
      "thymalin",
      "Thymic peptide bioregulator. Available in lyophilized powder form for research purposes.",
      "Longevity",
      [{ strength: "10mg", sku: "LONG-THYMAL-10MG", price: 9000 }]
    ),
    buildProduct(
      "Thymosin Alpha-1",
      "thymosin-alpha-1",
      "Naturally occurring thymic peptide with immunomodulatory properties. Available in lyophilized powder form for research purposes.",
      "Longevity",
      [{ strength: "10mg", sku: "LONG-TA1-10MG", price: 25500 }]
    ),
    buildProduct(
      "TB500",
      "tb500",
      "Synthetic fraction of Thymosin Beta-4 protein. Available in lyophilized powder form for research purposes.",
      "Longevity",
      [
        { strength: "5mg", sku: "LONG-TB500-5MG", price: 12000 },
        { strength: "10mg", sku: "LONG-TB500-10MG", price: 16500 },
      ]
    ),
    buildProduct(
      "BPC-157",
      "bpc-157",
      "Body Protection Compound-157, a pentadecapeptide. Available in lyophilized powder form for research purposes.",
      "Longevity",
      [
        { strength: "5mg", sku: "LONG-BPC157-5MG", price: 9000 },
        { strength: "10mg", sku: "LONG-BPC157-10MG", price: 13500 },
      ]
    ),
    buildProduct(
      "BPC 5mg + TB500 5mg",
      "bpc-5mg-tb500-5mg",
      "Combination blend of BPC-157 (5mg) and TB500 (5mg). Available in lyophilized powder form for research purposes.",
      "Longevity",
      [{ strength: "10mg", sku: "LONG-BPC5TB5-10MG", price: 13500 }]
    ),
    buildProduct(
      "BPC 10mg + TB500 10mg",
      "bpc-10mg-tb500-10mg",
      "Combination blend of BPC-157 (10mg) and TB500 (10mg). Available in lyophilized powder form for research purposes.",
      "Longevity",
      [{ strength: "20mg", sku: "LONG-BPC10TB10-20MG", price: 15000 }]
    ),
    buildProduct(
      "BPC + GHK-Cu + TB500 + KPV",
      "bpc-ghk-cu-tb500-kpv",
      "Multi-peptide blend of BPC-157, GHK-Cu, TB500, and KPV. Available in lyophilized powder form for research purposes.",
      "Longevity",
      [
        { strength: "70mg", sku: "LONG-BPCGHKTBKPV-70MG", price: 18000 },
        { strength: "80mg", sku: "LONG-BPCGHKTBKPV-80MG", price: 18000 },
      ]
    ),
    buildProduct(
      "GHK-CU",
      "ghk-cu",
      "Copper peptide GHK-Cu (glycyl-L-histidyl-L-lysine copper complex). Available in lyophilized powder form for research purposes.",
      "Longevity",
      [{ strength: "50mg", sku: "LONG-GHKCU-50MG", price: 9000 }]
    ),
    buildProduct(
      "MT-1",
      "mt-1",
      "Melanotan I, a synthetic analog of alpha-melanocyte stimulating hormone. Available in lyophilized powder form for research purposes.",
      "Longevity",
      [{ strength: "5mg", sku: "LONG-MT1-5MG", price: 9000 }]
    ),
    buildProduct(
      "MT-2",
      "mt-2",
      "Melanotan II, a synthetic analog of alpha-melanocyte stimulating hormone. Available in lyophilized powder form for research purposes.",
      "Longevity",
      [{ strength: "10mg", sku: "LONG-MT2-10MG", price: 9000 }]
    ),
    buildProduct(
      "NAD+",
      "nad-plus",
      "Nicotinamide adenine dinucleotide. Available in lyophilized powder form for research purposes.",
      "Longevity",
      [{ strength: "500mg", sku: "LONG-NAD-500MG", price: 12000 }]
    ),

    // ===== Performance =====
    buildProduct(
      "IGF-1 LR3",
      "igf-1-lr3",
      "Long R3 Insulin-like Growth Factor-1, a modified IGF-1 analog. Available in lyophilized powder form for research purposes.",
      "Performance",
      [{ strength: "1mg", sku: "PERF-IGF1LR3-1MG", price: 19500 }]
    ),
    buildProduct(
      "5-amino-1mq",
      "5-amino-1mq",
      "5-Amino-1-methylquinolinium, a small molecule NNMT inhibitor. Available in lyophilized powder form for research purposes.",
      "Performance",
      [{ strength: "5mg", sku: "PERF-5A1MQ-5MG", price: 27000 }]
    ),

    // ===== Misc =====
    buildProduct(
      "LYSINE-PROLINE-VALINE (KPV)",
      "kpv",
      "Tripeptide KPV (Lysine-Proline-Valine), a C-terminal fragment of alpha-MSH. Available in lyophilized powder form for research purposes.",
      "Misc",
      [
        { strength: "5mg", sku: "MISC-KPV-5MG", price: 12000 },
        { strength: "10mg", sku: "MISC-KPV-10MG", price: 13500 },
      ]
    ),
    buildProduct(
      "SLU-PP-332",
      "slu-pp-332",
      "ERR (Estrogen-Related Receptor) agonist compound. Available in lyophilized powder form for research purposes.",
      "Misc",
      [{ strength: "5mg", sku: "MISC-SLUPP332-5MG", price: 15000 }]
    ),
    buildProduct(
      "LL-37",
      "ll-37",
      "Human cathelicidin antimicrobial peptide. Available in lyophilized powder form for research purposes.",
      "Misc",
      [{ strength: "5mg", sku: "MISC-LL37-5MG", price: 12000 }]
    ),
    buildProduct(
      "MOTS-c",
      "mots-c",
      "Mitochondrial-derived peptide encoded in the 12S rRNA gene. Available in lyophilized powder form for research purposes.",
      "Misc",
      [{ strength: "10mg", sku: "MISC-MOTSC-10MG", price: 9000 }]
    ),
  ];

  // --- Create products in batches to avoid overwhelming the system ---
  const BATCH_SIZE = 10;
  for (let i = 0; i < products.length; i += BATCH_SIZE) {
    const batch = products.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(products.length / BATCH_SIZE);
    logger.info(`Seeding product batch ${batchNum}/${totalBatches} (${batch.length} products)...`);

    await createProductsWorkflow(container).run({
      input: { products: batch },
    });
  }
  logger.info(`Finished seeding ${products.length} products.`);

  // --- Set inventory levels for all new products ---
  logger.info("Seeding inventory levels for new products...");
  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id"],
  });

  // Get existing inventory levels to avoid duplicates
  const { data: existingLevels } = await query.graph({
    entity: "inventory_level",
    fields: ["inventory_item_id"],
    filters: {
      location_id: stockLocationId,
    },
  });
  const existingItemIds = new Set(
    existingLevels.map((l: any) => l.inventory_item_id)
  );

  const newInventoryLevels: CreateInventoryLevelInput[] = [];
  for (const item of inventoryItems) {
    if (!existingItemIds.has(item.id)) {
      newInventoryLevels.push({
        location_id: stockLocationId,
        stocked_quantity: 1000000,
        inventory_item_id: item.id,
      });
    }
  }

  if (newInventoryLevels.length > 0) {
    await createInventoryLevelsWorkflow(container).run({
      input: { inventory_levels: newInventoryLevels },
    });
    logger.info(
      `Finished seeding ${newInventoryLevels.length} inventory levels.`
    );
  } else {
    logger.info("No new inventory levels needed.");
  }

  logger.info("Product seeding complete!");
}
