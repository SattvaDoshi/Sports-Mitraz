require("dotenv").config({ path: __dirname + "/../../.env" });
const { sequelize, Category, Product } = require("../models");

// ── All categories with their sub-products ───────────────────────────────────
const catalogData = [
  {
    name: "Auction Accessories",
    slug: "auction-accessories",
    description:
      "Custom auction products that make your player auction look organised, branded and memorable.",
    image: null,
    sortOrder: 1,
    tags: ["Custom logo", "Names", "Bulk order"],
    products: [
      {
        name: "Auction Paddles",
        slug: "auction-paddles",
        description:
          "Team-number, team-name or sponsor-branded paddles for live bidding.",
        startingPrice: 120,
        tags: ["Custom logo", "Team name", "Numbering"],
        sortOrder: 1,
      },
      {
        name: "Team Table Tops",
        slug: "team-table-tops",
        description:
          "Branded team identifiers for owner desks and auction tables.",
        startingPrice: 350,
        tags: ["Acrylic/MDF", "Team logo", "Custom size"],
        sortOrder: 2,
      },
      {
        name: "Custom Cricket Bails",
        slug: "custom-cricket-bails",
        description:
          "Personalised bails with player names, tournament names or branding.",
        startingPrice: 80,
        tags: ["Player name", "Tournament logo", "Gift-ready"],
        sortOrder: 3,
      },
      {
        name: "Player Keychains",
        slug: "player-keychains",
        description:
          "Cricket, football and pickleball themed personalised keychains.",
        startingPrice: 50,
        tags: ["Player name", "Jersey number", "Sport theme"],
        sortOrder: 4,
      },
      {
        name: "Auction Boards",
        slug: "auction-boards",
        description:
          "Reusable or tournament-specific display boards for live auctions.",
        startingPrice: 500,
        tags: ["Team branding", "Custom layout", "Large format"],
        sortOrder: 5,
      },
      {
        name: "Auction Combo Sets",
        slug: "auction-combo-sets",
        description:
          "Complete paddle + board + tabletop packs for professional auction presentation.",
        startingPrice: 1200,
        tags: ["Bundle", "Event theme", "Custom quantity"],
        sortOrder: 6,
      },
    ],
  },
  {
    name: "Trophies & Medals",
    slug: "trophies-medals",
    description:
      "Awards designed around your event, sport and brand — from economical bulk medals to premium custom trophies.",
    image: null,
    sortOrder: 2,
    tags: ["Acrylic", "Metal", "Medals"],
    products: [
      {
        name: "Acrylic Trophies",
        slug: "acrylic-trophies",
        description:
          "Modern laser-cut acrylic trophies for Player of the Match, winners and special awards.",
        startingPrice: 250,
        tags: ["Custom shape", "Print", "Player name"],
        sortOrder: 1,
      },
      {
        name: "Metal Trophies",
        slug: "metal-trophies",
        description:
          "Classic metal trophy options for winners, runners-up and individual categories.",
        startingPrice: 450,
        tags: ["Multiple sizes", "Engraving", "Premium finish"],
        sortOrder: 2,
      },
      {
        name: "Fibre Trophies",
        slug: "fibre-trophies",
        description:
          "Sports-themed fibre trophies with custom name plates and finishes.",
        startingPrice: 300,
        tags: ["Sport themes", "Custom plate", "Bulk order"],
        sortOrder: 3,
      },
      {
        name: "Momentos",
        slug: "momentos",
        description:
          "Recognition momentos for guests, sponsors, officials, coaches and corporates.",
        startingPrice: 200,
        tags: ["Logo", "Name plate", "Custom message"],
        sortOrder: 4,
      },
      {
        name: "Custom Medals",
        slug: "custom-medals",
        description:
          "Tournament medals with custom ribbon, logo, sport icon and finishing.",
        startingPrice: 60,
        tags: ["Custom ribbon", "Logo", "Bulk quantity"],
        sortOrder: 5,
      },
      {
        name: "Award Sets",
        slug: "award-sets",
        description:
          "Combined trophy + medal + certificate packages for complete events.",
        startingPrice: 800,
        tags: ["Matching set", "Event branding", "Bulk package"],
        sortOrder: 6,
      },
    ],
  },
  {
    name: "Custom Jerseys",
    slug: "custom-jerseys",
    description:
      "Flexible custom teamwear for leagues, academies and sports communities with multiple sublimation and branding options.",
    image: null,
    sortOrder: 3,
    tags: ["Sublimation", "Name", "Number"],
    products: [
      {
        name: "Front Sublimation Jersey",
        slug: "front-sublimation-jersey",
        description:
          "Custom printed front with team graphics, logo and sponsor marks.",
        startingPrice: 350,
        tags: ["Team logo", "Sponsors", "Player details"],
        sortOrder: 1,
      },
      {
        name: "Both-Side Sublimation Jersey",
        slug: "both-side-sublimation-jersey",
        description:
          "Front and back sublimation with player name, number and sponsor visibility.",
        startingPrice: 450,
        tags: ["Front/back design", "Name", "Number"],
        sortOrder: 2,
      },
      {
        name: "Full Sublimation Jersey",
        slug: "full-sublimation-jersey",
        description:
          "Complete all-over customised jersey with full creative freedom.",
        startingPrice: 600,
        tags: ["Full design", "Multiple colours", "Team kit"],
        sortOrder: 3,
      },
      {
        name: "Plain Jersey with Logo",
        slug: "plain-jersey-with-logo",
        description:
          "Simple team jersey with printed logo, sponsor and player details.",
        startingPrice: 200,
        tags: ["Fast option", "Logo print", "Bulk team order"],
        sortOrder: 4,
      },
      {
        name: "Tournament T-Shirts",
        slug: "tournament-t-shirts",
        description:
          "Dry-fit or round-neck tees for teams, volunteers and event staff.",
        startingPrice: 150,
        tags: ["Logo", "Event theme", "Staff/team use"],
        sortOrder: 5,
      },
      {
        name: "Tracksuits & Teamwear",
        slug: "tracksuits-teamwear",
        description:
          "Matching travel and training apparel for teams and academies.",
        startingPrice: 800,
        tags: ["Team identity", "Custom branding", "Bulk sizing"],
        sortOrder: 6,
      },
    ],
  },
  {
    name: "Printing Services",
    slug: "printing-services",
    description:
      "Sports-event printing and branding materials that give your venue, stage and tournament a professional identity.",
    image: null,
    sortOrder: 4,
    tags: ["Banners", "Backdrops", "Event print"],
    products: [
      {
        name: "Event Banners",
        slug: "event-banners",
        description:
          "Custom tournament banners for entry, stage, sponsor and ground branding.",
        startingPrice: 300,
        tags: ["Custom size", "Sponsor logos", "Event theme"],
        sortOrder: 1,
      },
      {
        name: "Flex Printing",
        slug: "flex-printing",
        description:
          "Large-format flex prints for outdoor and indoor sports event use.",
        startingPrice: 150,
        tags: ["Large format", "Fast turnaround", "Multiple sizes"],
        sortOrder: 2,
      },
      {
        name: "Backdrops",
        slug: "backdrops",
        description:
          "Sponsor walls and stage backdrops for award ceremonies, auctions and launches.",
        startingPrice: 800,
        tags: ["Sponsor wall", "Photo zone", "Stage branding"],
        sortOrder: 3,
      },
      {
        name: "Standees",
        slug: "standees",
        description:
          "Portable branding standees for schedules, sponsors and directional information.",
        startingPrice: 400,
        tags: ["Portable", "Custom artwork", "Event use"],
        sortOrder: 4,
      },
      {
        name: "Posters & Signage",
        slug: "posters-signage",
        description:
          "Fixtures, rules, directional boards and promotional sports-event prints.",
        startingPrice: 100,
        tags: ["Indoor/outdoor", "Custom layout", "Quick print"],
        sortOrder: 5,
      },
      {
        name: "Certificates",
        slug: "certificates",
        description:
          "Branded participation, appreciation and award certificates.",
        startingPrice: 30,
        tags: ["Names", "Logos", "Event details"],
        sortOrder: 6,
      },
    ],
  },
  {
    name: "Sports Accessories",
    slug: "sports-accessories",
    description:
      "Useful sports and tournament accessories for teams, academies, organisers and corporate sports events.",
    image: null,
    sortOrder: 5,
    tags: ["Equipment", "Team gear", "Custom items"],
    products: [
      {
        name: "Team Caps",
        slug: "team-caps",
        description:
          "Branded caps for players, organisers, volunteers and support staff.",
        startingPrice: 120,
        tags: ["Logo branding", "Team colours", "Bulk order"],
        sortOrder: 1,
      },
      {
        name: "Sports Bags",
        slug: "sports-bags",
        description:
          "Team and player bags for kits, travel and tournament use.",
        startingPrice: 500,
        tags: ["Logo print", "Multiple sizes", "Team use"],
        sortOrder: 2,
      },
      {
        name: "Water Bottles",
        slug: "water-bottles",
        description:
          "Custom-branded bottles for teams, academies and event giveaways.",
        startingPrice: 80,
        tags: ["Logo", "Names", "Event branding"],
        sortOrder: 3,
      },
      {
        name: "Training Accessories",
        slug: "training-accessories",
        description:
          "Cones, markers and selected training equipment for sports groups.",
        startingPrice: 200,
        tags: ["Academy use", "Bulk order", "Event supply"],
        sortOrder: 4,
      },
      {
        name: "Sports Balls",
        slug: "sports-balls",
        description:
          "Selected cricket, football and other sports balls for event and prize kits.",
        startingPrice: 300,
        tags: ["Event use", "Team packs", "Selected brands"],
        sortOrder: 5,
      },
      {
        name: "Custom Event Kits",
        slug: "custom-event-kits",
        description:
          "Curated combinations for players, volunteers, organisers and participants.",
        startingPrice: 1000,
        tags: ["Custom bundle", "Logo branding", "Event-ready"],
        sortOrder: 6,
      },
    ],
  },
];

const seedCatalog = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connected");

    await sequelize.sync({ alter: true });
    console.log("✅ Database synced");

    let categoriesCreated = 0;
    let categoriesSkipped = 0;
    let productsCreated = 0;
    let productsSkipped = 0;

    for (const catData of catalogData) {
      const { products: productList, ...categoryFields } = catData;

      // Upsert category
      const [category, catCreated] = await Category.findOrCreate({
        where: { slug: categoryFields.slug },
        defaults: {
          name: categoryFields.name,
          slug: categoryFields.slug,
          description: categoryFields.description,
          image: categoryFields.image,
          sortOrder: categoryFields.sortOrder,
          isLeaf: false,
          isActive: true,
        },
      });

      if (catCreated) {
        categoriesCreated++;
        console.log(`  ✅ Category created: ${category.name}`);
      } else {
        categoriesSkipped++;
        console.log(`  ⏭️  Category already exists: ${category.name}`);
      }

      // Seed products for this category
      for (const prodData of productList) {
        const [product, prodCreated] = await Product.findOrCreate({
          where: { slug: prodData.slug },
          defaults: {
            name: prodData.name,
            slug: prodData.slug,
            description: prodData.description,
            startingPrice: prodData.startingPrice,
            categoryId: category.id,
            images: [],
            tags: prodData.tags || [],
            isActive: true,
            sortOrder: prodData.sortOrder,
          },
        });

        if (prodCreated) {
          productsCreated++;
          console.log(`     ✅ Product created: ${product.name}`);
        } else {
          productsSkipped++;
          console.log(`     ⏭️  Product already exists: ${product.name}`);
        }
      }
    }

    console.log("\n🎉 Seed complete!");
    console.log(`   Categories: ${categoriesCreated} created, ${categoriesSkipped} skipped`);
    console.log(`   Products:   ${productsCreated} created, ${productsSkipped} skipped`);
  } catch (error) {
    console.error("❌ Seed failed:", error);
  } finally {
    process.exit(0);
  }
};

seedCatalog();
