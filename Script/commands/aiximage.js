const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "aiximage",
    aliases: ["sdimg", "hfia"],
    version: "1.0",
    author: "You",
    countDown: 10,
    role: 0,
    shortDescription: "Generate AI image (free no-key API)",
    category: "AI",
    guide: "{p}aiimage [prompt]",
  },

  onStart: async function({ api, event, args }) {
    const prompt = args.join(" ").trim();
    if (!prompt) {
      return api.sendMessage("❌ Please enter a prompt!\nExample: /aiimage samurai in garden", event.threadID);
    }

    api.sendMessage("⏳ Generating image, please wait...", event.threadID);

    try {
      const response = await axios.post(
        "https://backend.craiyon.com/generate",
        { prompt },
        { timeout: 180000 }
      );

      if (!response.data || !response.data.images || !response.data.images.length) {
        return api.sendMessage("❌ Failed to generate image. Please try again later.", event.threadID);
      }

      // First generated image (base64)
      const base64Image = response.data.images[0];

      // Convert base64 string to Buffer
      const imageBuffer = Buffer.from(base64Image, "base64");

      // Save to temporary file
      const imgPath = path.join(__dirname, "cache", `craiyon_${Date.now()}.jpg`);
      fs.writeFileSync(imgPath, imageBuffer);

      // Send image then delete file
      api.sendMessage({
        body: `🖼️ Here is your AI image for: "${prompt}"`,
        attachment: fs.createReadStream(imgPath),
      }, event.threadID, () => fs.unlinkSync(imgPath));

    } catch (error) {
      console.error(error);
      api.sendMessage("❌ Something went wrong while generating the image. Try again later.", event.threadID);
    }
  }
};
