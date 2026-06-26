import { PrismaClient } from "./packages/product-db/generated/prisma";
import { createKafkaClient, createProducer } from "./packages/kafka/src/index";

const prisma = new PrismaClient();
const kafkaClient = createKafkaClient("product-seeder");
const producer = createProducer(kafkaClient);

const categories = [
  { name: "Shirts", slug: "shirts" },
  { name: "Shoes", slug: "shoes" },
  { name: "Pants", slug: "pants" },
];

const shirtsImages = [
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500",
  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500",
];

const shoesImages = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500",
];

const pantsImages = [
  "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500",
  "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500",
];

const productsData = [
  // SHIRTS (11 products)
  {
    name: "Classic Crewneck Shirt",
    shortDescription: "Timeless cotton crewneck for everyday wear.",
    description: "This premium crewneck shirt is made from ultra-soft organic cotton. Perfect as a base layer or worn on its own.",
    price: 25,
    colors: ["white", "black", "blue"],
    sizes: ["s", "m", "l", "xl"],
    categorySlug: "shirts",
    imagesMap: {
      white: shirtsImages[0],
      black: shirtsImages[1],
      blue: shirtsImages[2],
    },
  },
  {
    name: "Retro Polo Shirt",
    shortDescription: "A smart-casual cotton polo with retro accents.",
    description: "Elevate your look with our retro-style knit polo. Features a comfortable ribbed collar and cuffs.",
    price: 35,
    colors: ["blue", "black", "white"],
    sizes: ["s", "m", "l", "xl"],
    categorySlug: "shirts",
    imagesMap: {
      blue: shirtsImages[2],
      black: shirtsImages[1],
      white: shirtsImages[0],
    },
  },
  {
    name: "Comfort Fleece Sweater",
    shortDescription: "Heavyweight fleece knit for ultimate warmth.",
    description: "Stay cozy in style. This sweater features a brushed fleece interior and a relaxed fit for absolute comfort.",
    price: 49,
    colors: ["white", "black"],
    sizes: ["m", "l", "xl", "xxl"],
    categorySlug: "shirts",
    imagesMap: {
      white: shirtsImages[0],
      black: shirtsImages[1],
    },
  },
  {
    name: "Linen Button-Up",
    shortDescription: "Lightweight, breathable linen shirt.",
    description: "Crafted from pure linen, this button-up shirt keeps you cool during hot summer days with an effortless, relaxed vibe.",
    price: 45,
    colors: ["white", "blue"],
    sizes: ["s", "m", "l", "xl"],
    categorySlug: "shirts",
    imagesMap: {
      white: shirtsImages[0],
      blue: shirtsImages[2],
    },
  },
  {
    name: "Graphic Printed Tee",
    shortDescription: "Bold graphics printed on premium fabric.",
    description: "Express yourself with our unique graphic tee. Built with robust stitching and pre-shrunk cotton.",
    price: 22,
    colors: ["blue", "black"],
    sizes: ["s", "m", "l"],
    categorySlug: "shirts",
    imagesMap: {
      blue: shirtsImages[2],
      black: shirtsImages[1],
    },
  },
  {
    name: "Slim-Fit Oxford Shirt",
    shortDescription: "Classic tailored dress shirt for formal occasions.",
    description: "A tailored-fit shirt made of premium oxford weave. The perfect shirt for the office or formal events.",
    price: 55,
    colors: ["white", "blue"],
    sizes: ["s", "m", "l", "xl"],
    categorySlug: "shirts",
    imagesMap: {
      white: shirtsImages[0],
      blue: shirtsImages[2],
    },
  },
  {
    name: "Heavyweight Hooded Sweatshirt",
    shortDescription: "Double-lined hood with a kangaroo pocket.",
    description: "The ultimate hoodie. Crafted from thick 400GSM cotton fleece with heavy-duty ribbing.",
    price: 60,
    colors: ["black", "blue"],
    sizes: ["m", "l", "xl", "xxl"],
    categorySlug: "shirts",
    imagesMap: {
      black: shirtsImages[1],
      blue: shirtsImages[2],
    },
  },
  {
    name: "Vintage Flannel Shirt",
    shortDescription: "Brushed flannel shirt in classic plaid.",
    description: "A rugged, classic flannel shirt. Features dual chest pockets and a warm brushed texture.",
    price: 38,
    colors: ["black", "blue"],
    sizes: ["s", "m", "l", "xl"],
    categorySlug: "shirts",
    imagesMap: {
      black: shirtsImages[1],
      blue: shirtsImages[2],
    },
  },
  {
    name: "Active Performance Tee",
    shortDescription: "Moisture-wicking fabric for workouts.",
    description: "Engineered to keep you dry. Lightweight, stretchy, and quick-drying fabric for high-intensity training.",
    price: 28,
    colors: ["blue", "white"],
    sizes: ["s", "m", "l", "xl"],
    categorySlug: "shirts",
    imagesMap: {
      blue: shirtsImages[2],
      white: shirtsImages[0],
    },
  },
  {
    name: "Oversized Streetwear Tee",
    shortDescription: "Relaxed drop-shoulder silhouette shirt.",
    description: "Modern streetwear essential. Loose fit, crew collar, and thick durable cotton fabric.",
    price: 30,
    colors: ["black", "white"],
    sizes: ["s", "m", "l", "xl"],
    categorySlug: "shirts",
    imagesMap: {
      black: shirtsImages[1],
      white: shirtsImages[0],
    },
  },
  {
    name: "Striped Casual Tee",
    shortDescription: "Breton striped short sleeve t-shirt.",
    description: "A classic look. Fine horizontal stripes on combed cotton for a premium and clean casual outfit.",
    price: 24,
    colors: ["blue", "white"],
    sizes: ["s", "m", "l"],
    categorySlug: "shirts",
    imagesMap: {
      blue: shirtsImages[2],
      white: shirtsImages[0],
    },
  },

  // SHOES (11 products)
  {
    name: "Apex Runner Sneaker",
    shortDescription: "High-performance running shoe with carbon plate.",
    description: "Designed for speed and cushioning. Our Apex runner sneaker features energy-returning foam and breathable knit mesh.",
    price: 95,
    colors: ["white", "black"],
    sizes: ["40", "41", "42", "43", "44"],
    categorySlug: "shoes",
    imagesMap: {
      white: shoesImages[1],
      black: shoesImages[2],
    },
  },
  {
    name: "Retro Leather Low-Tops",
    shortDescription: "Premium full-grain leather everyday sneaker.",
    description: "A vintage silhouette built with modern comfort. Features a vulcanized rubber outsole and cushioned leather insoles.",
    price: 85,
    colors: ["white", "black"],
    sizes: ["39", "40", "41", "42", "43", "44"],
    categorySlug: "shoes",
    imagesMap: {
      white: shoesImages[0],
      black: shoesImages[2],
    },
  },
  {
    name: "Neon Boost Sport Shoes",
    shortDescription: "Max cushioning for long distance training.",
    description: "Stand out while you run. Maximum shock-absorption midsole with eye-catching styling.",
    price: 110,
    colors: ["white", "black"],
    sizes: ["38", "39", "40", "41", "42"],
    categorySlug: "shoes",
    imagesMap: {
      white: shoesImages[1],
      black: shoesImages[2],
    },
  },
  {
    name: "Volt Trail Running Shoes",
    shortDescription: "Rugged tread outsole for off-road trail running.",
    description: "Conquer any terrain. Deep lugs provide excellent grip on mud, rock, and wet trails.",
    price: 120,
    colors: ["white", "black"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    categorySlug: "shoes",
    imagesMap: {
      white: shoesImages[0],
      black: shoesImages[2],
    },
  },
  {
    name: "Urban Trainer Sneaker",
    shortDescription: "Sleek modern trainers for gym and street.",
    description: "Versatility at its best. Lightweight materials combined with a clean style that transitions from gym to hangouts.",
    price: 75,
    colors: ["white", "black"],
    sizes: ["40", "41", "42", "43"],
    categorySlug: "shoes",
    imagesMap: {
      white: shoesImages[1],
      black: shoesImages[2],
    },
  },
  {
    name: "Skate High-Top Sneaker",
    shortDescription: "Ankle-support canvas high-tops for skating.",
    description: "Durable canvas uppers with suede reinforcements. Built to withstand skate sessions while providing comfort.",
    price: 80,
    colors: ["white", "black"],
    sizes: ["39", "40", "41", "42", "43", "44"],
    categorySlug: "shoes",
    imagesMap: {
      white: shoesImages[0],
      black: shoesImages[2],
    },
  },
  {
    name: "Canvas Everyday Slip-on",
    shortDescription: "Easy slip-on comfort sneakers.",
    description: "Casual canvas shoes with elastic goring for easy on and off. Features a lightweight cushioned footbed.",
    price: 50,
    colors: ["white", "black"],
    sizes: ["39", "40", "41", "42", "43"],
    categorySlug: "shoes",
    imagesMap: {
      white: shoesImages[1],
      black: shoesImages[2],
    },
  },
  {
    name: "Cushioned Jogging Shoes",
    shortDescription: "Soft foam midsole for comfortable daily runs.",
    description: "Perfect for beginners and casual joggers. Provides reliable comfort and support kilometer after kilometer.",
    price: 90,
    colors: ["black", "white"],
    sizes: ["40", "41", "42", "43", "44"],
    categorySlug: "shoes",
    imagesMap: {
      black: shoesImages[2],
      white: shoesImages[0],
    },
  },
  {
    name: "Classic White Tennis Shoes",
    shortDescription: "Minimalist leather tennis shoe design.",
    description: "Clean aesthetic. Full grain leather construction with minimal branding. Fits with any smart casual outfit.",
    price: 70,
    colors: ["white", "black"],
    sizes: ["40", "41", "42", "43", "44"],
    categorySlug: "shoes",
    imagesMap: {
      white: shoesImages[1],
      black: shoesImages[2],
    },
  },
  {
    name: "Carbon Fiber Speed Runners",
    shortDescription: "Ultra-lightweight marathon racing shoes.",
    description: "Engineered for elite performance. Propulsive carbon-fiber plate delivers maximum efficiency at high speeds.",
    price: 150,
    colors: ["white", "black"],
    sizes: ["40", "41", "42", "43", "44"],
    categorySlug: "shoes",
    imagesMap: {
      white: shoesImages[0],
      black: shoesImages[2],
    },
  },
  {
    name: "Suede Casual Loafers",
    shortDescription: "Elegant slip-on suede leather shoes.",
    description: "Handcrafted suede loafers with a soft leather lining and durable rubber driving outsole.",
    price: 99,
    colors: ["white", "black"],
    sizes: ["39", "40", "41", "42", "43", "44"],
    categorySlug: "shoes",
    imagesMap: {
      white: shoesImages[1],
      black: shoesImages[2],
    },
  },

  // PANTS (11 products)
  {
    name: "Comfort Stretch Jeans",
    shortDescription: "Medium wash denim jeans with flexible stretch.",
    description: "The look of classic denim with the comfort of sweatpants. Features a durable poly-cotton blend with active stretch.",
    price: 59,
    colors: ["blue", "black"],
    sizes: ["36", "38", "40", "42"],
    categorySlug: "pants",
    imagesMap: {
      blue: pantsImages[0],
      black: pantsImages[2],
    },
  },
  {
    name: "Slim-Fit Cotton Chinos",
    shortDescription: "Versatile flat-front chino trousers.",
    description: "Perfect trouser for office-to-dinner wear. Cotton twill construction with a hint of elastane for movement.",
    price: 49,
    colors: ["blue", "black"],
    sizes: ["36", "38", "40", "42"],
    categorySlug: "pants",
    imagesMap: {
      blue: pantsImages[0],
      black: pantsImages[1],
    },
  },
  {
    name: "Tech Wear Cargo Pants",
    shortDescription: "Multi-pocket durable nylon utility pants.",
    description: "Water-resistant, multiple tactical pockets, and built-in adjustable web belt. Built for the modern explorer.",
    price: 69,
    colors: ["blue", "black"],
    sizes: ["36", "38", "40", "42"],
    categorySlug: "pants",
    imagesMap: {
      blue: pantsImages[0],
      black: pantsImages[2],
    },
  },
  {
    name: "Athletic Fleece Joggers",
    shortDescription: "Tapered sweatpants with ribbed cuffs.",
    description: "Comfy athletic joggers made of organic cotton fleece. Features secure zipper side pockets and drawstring waist.",
    price: 45,
    colors: ["black", "blue"],
    sizes: ["36", "38", "40"],
    categorySlug: "pants",
    imagesMap: {
      black: pantsImages[2],
      blue: pantsImages[0],
    },
  },
  {
    name: "Everyday Knit Sweatpants",
    shortDescription: "Loose-fit ultra-soft lounge sweatpants.",
    description: "Relax in pure comfort. Heavyweight knit cotton fleece with an elastic waistband for the perfect weekend lounge fit.",
    price: 39,
    colors: ["blue", "black"],
    sizes: ["36", "38", "40", "42"],
    categorySlug: "pants",
    imagesMap: {
      blue: pantsImages[0],
      black: pantsImages[1],
    },
  },
  {
    name: "Urban Utility Work Pants",
    shortDescription: "Rugged double-knee canvas work pants.",
    description: "Hard-wearing cotton duck canvas work pants. Features utility pockets, hammer loop, and reinforced knees.",
    price: 75,
    colors: ["blue", "black"],
    sizes: ["36", "38", "40", "42"],
    categorySlug: "pants",
    imagesMap: {
      blue: pantsImages[0],
      black: pantsImages[2],
    },
  },
  {
    name: "Tailored Dress Trousers",
    shortDescription: "Wool-blend slim trousers for formal wear.",
    description: "Sharp tailoring. Flat-front construction with creased legs, side pockets, and premium button closure.",
    price: 89,
    colors: ["black", "blue"],
    sizes: ["36", "38", "40"],
    categorySlug: "pants",
    imagesMap: {
      black: pantsImages[2],
      blue: pantsImages[0],
    },
  },
  {
    name: "Ripped Denim Slim Jeans",
    shortDescription: "Slim fit jeans with stylish distressed rips.",
    description: "Add an edge to your style. Distressed denim jeans with reinforced stitching underneath the knee rips.",
    price: 65,
    colors: ["blue", "black"],
    sizes: ["36", "38", "40", "42"],
    categorySlug: "pants",
    imagesMap: {
      blue: pantsImages[0],
      black: pantsImages[2],
    },
  },
  {
    name: "Lightweight Summer Chinos",
    shortDescription: "Breathable linen-cotton blend summer pants.",
    description: "Stay smart and cool in warm weather. A breezy cotton-linen fabric in a modern tapered leg cut.",
    price: 55,
    colors: ["blue", "black"],
    sizes: ["36", "38", "40", "42"],
    categorySlug: "pants",
    imagesMap: {
      blue: pantsImages[0],
      black: pantsImages[1],
    },
  },
  {
    name: "Linen Tapered Drawstring Pants",
    shortDescription: "Elastic drawstring waist linen trousers.",
    description: "Relaxed resort wear. Pure linen fabric, casual drawstring closure, and side slash pockets.",
    price: 50,
    colors: ["blue", "black"],
    sizes: ["36", "38", "40"],
    categorySlug: "pants",
    imagesMap: {
      blue: pantsImages[0],
      black: pantsImages[2],
    },
  },
  {
    name: "Heavyweight Canvas Cargoes",
    shortDescription: "Thick washed canvas trousers with cargo slots.",
    description: "Sturdy and robust canvas cargo pants. Features button flap cargo pockets and pre-washed for broken-in comfort.",
    price: 79,
    colors: ["blue", "black"],
    sizes: ["36", "38", "40", "42"],
    categorySlug: "pants",
    imagesMap: {
      blue: pantsImages[0],
      black: pantsImages[1],
    },
  },
];

async function seed() {
  try {
    console.log("Connecting Kafka producer...");
    await producer.connect();

    console.log("Cleaning database...");
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});

    console.log("Creating categories...");
    for (const cat of categories) {
      await prisma.category.create({
        data: {
          name: cat.name,
          slug: cat.slug,
        },
      });
    }

    console.log("Creating products...");
    for (const p of productsData) {
      const createdProduct = await prisma.product.create({
        data: {
          name: p.name,
          shortDescription: p.shortDescription,
          description: p.description,
          price: p.price,
          colors: p.colors,
          sizes: p.sizes,
          images: p.imagesMap,
          categorySlug: p.categorySlug,
        },
      });

      // Send to Kafka to sync with stripe/other services
      const stripeProduct = {
        id: createdProduct.id.toString(),
        name: createdProduct.name,
        price: createdProduct.price,
      };

      console.log(`Sending product ${createdProduct.name} to Kafka...`);
      await producer.send("product.created", { value: stripeProduct });
    }

    console.log("Seed finished successfully!");
  } catch (error) {
    console.error("Error during seed:", error);
  } finally {
    await prisma.$disconnect();
    await producer.disconnect();
  }
}

seed();
