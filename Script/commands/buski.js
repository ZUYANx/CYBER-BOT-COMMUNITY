const activeSpam = {};
const blockedUsers = {};

module.exports.config = {
    name: "buski",
    version: "3.0.0",
    hasPermssion: 0,
    credits: "MR ZUYAN", // Don't change credit
    description: "Bangladeshi gali spam to mentioned person (only specific UIDs allowed)",
    commandCategory: "fun",
    usages: "/buski @mention | /buski stop",
    cooldowns: 5
};

// ✅ Allowed UIDs (add more if needed)
const allowedUIDs = ["100006158207808"]; // Add more UIDs as needed

// 💥 Gali List
const galiList = [  
  "তোর মতো গাধা দেখলে গরু হিংসে করে 🐄",  
  "তুই যে বুদ্ধির কাঁচা, আইকিউ পরীক্ষায় ফেইল করবি 📉",  
  "তোর মাথায় পাখি বাসা বানাইছে নাকি? 🐦",  
  "তুই তো বালতি ছাড়া গোসল করতে চাস 🪣",  
  "তুই পেঁয়াজ কেটে হাসিস 😹",  
  "তোর কপালে প্রেম নেই, ডাস্টবিনেও রিজেক্ট 😔",  
  "তুই ফ্যান ছাড়া গরম কইরস 😓",  
  "তুই সেই, যারে রিমুভ দিলেও 'seen' করে না 🫠",  
  "তোর মুখে চা খেলে চা নিজেই লজ্জা পায় ☕",  
  "তোর ঘাড়ে লাথি দিলে লাথি ব্যথা পায় 😵",  
  "তুই WiFi ছাড়াও disconnect 🤡",  
  "তুই আছিস তবুও নাই 🤷‍♂️",  
  "তোর মগজে গোলমাল চলছে, সার্ভার ডাউন 🔻",  
  "তুই কলা খেয়ে কলার চামড়ায় পিছলাইছস 🍌",  
  "তোর নামে তো প্রেমিকারাও 'না' বলে 😭",  
  "তুই ছাতা ছাড়াও ভিজস, কারণ বুদ্ধি গলে পড়ছে ☔",  
  "তুই প্রেম করতে গেলে মেয়েরা VPN দিয়ে পালায় 🧍‍♀️📡",  
  "তুই প্রপোজ করলে Reject বাটন গরম হয়ে যায় 🔥",  
  "তোর ছবি দেখে FaceApp uninstall হয় 😬",  
  "তুই এত গাধা, Google তোকে সার্চ করতে ভয় পায় 🔍",  
  "তোর মত মানুষ 240p তেও বাজে দেখা যায় 📺",  
  "তোর মত আইডিয়া দিলে Elon Musk লজ্জা পায় 🚀",  
  "তুই exam দিলে প্রশ্ন ভুল হয়ে যায় ❌",  
  "তুই লজেন্স কিনে খালি wrapper খাস 🍬",  
  "তুই সেই ছেলে, যারে বলে 'ভুল জন্ম' 😐",  
  "তুই CPU ছাড়া কম্পিউটার 🧠💻",  
  "তুই ঝাল খেলে পানি না, আগুন খাস 🔥",  
  "তোর হাসি শুনলে রোবট ক্র্যাশ খায় 🤖",  
  "তুই পিয়াজের দামে বিক্রি হবি 🧅",  
  "তুই নামতা ভুলে গেছিস, তোর বাচ্চাও না জানবে ২x২ = ৪ 😭",  
  "তুই নদীর পাশে দাঁড়িয়ে ডুবে যাস 😑",  
  "তুই এমন গরু, যারে দুধ না, দুধও ভয় পায় 😱",  
  "তুই তো ডিলিট করা ফাইল, যার ব্যাকআপও নাই 🗑️",  
  "তোর টাইপের উপর অ্যান্টিভাইরাস চলে না 🛑",  
  "তুই ফোনে চার্জ নেই, ক্যাবলও নাই, বুদ্ধিও নাই 😩",  
  "তুই তো বাতাস ছাড়া সাইকেল 🚲",  
  "তুই কোকের বোতলে পানি 🧃",  
  "তুই নষ্ট ফ্যান, ঘোরস না, শব্দ করস 💨",  
  "তুই তো রাস্তার পাশের পাঁকা আম – কেও খায় না 🥭",  
  "তুই এত হিউমিলিয়েটেড যে, ফেসবুকেও Friend Request আসেনা 😵",  
  "তুই এমন বোকা, তোর গুগল ও তোকে সার্চ দেয় না 🔎",  
  "তুই যে মানুষের মতো মানুষ না, রোবট হইলেও লজ্জা পাইত 🤖",  
  "তুই চ্যাটজিপিটিতে প্রশ্ন করলে ও চুপ মারে 🤫",  
  "তুই লাইভে গেলে সবাই অফলাইনে যায় 📵",  
  "তুই সিনেমার খলনায়ক হইতে পারস না, কারণ তারা সুন্দর থাকে 🎬",  
  "তোর জন্মদিনে Facebook ও notification দেয় না 🎂",  
  "তুই যেই মেয়েরে পছন্দ করস, সে তোর গালি লিস্টে 🧍‍♀️➡️📵",  
  "তুই টাকা ছাড়া এটিএম 💸",  
  "তুই সিগন্যাল ছাড়াও ট্রাফিক জ্যাম 🤯",  
  "তুই রাত ৩টার ফেক কল 📞",  
  "তুই এত বাজে, তোরে YouTube demonetize করে দিয়েছে 📉",];
// 🔁 Spam Function
function startSpam(api, threadID, targetID, targetName) {
    if (!activeSpam[threadID]) return;

    const gali = galiList[Math.floor(Math.random() * galiList.length)];
    const message = `⚠️ ${gali}\n\n👉 ${targetName}`;

    api.sendMessage({
        body: message,
        mentions: [{ tag: targetName, id: targetID }]
    }, threadID, () => {
        setTimeout(() => startSpam(api, threadID, targetID, targetName), 2000);
    });
}

module.exports.run = async function ({ api, event }) {
    try {
        const { senderID, threadID, mentions, body } = event;

        // ✅ Check if sender is in allowed UID list
        if (!allowedUIDs.includes(senderID)) {
            return api.sendMessage("⛔ You are not allowed to use this command!", threadID);
        }

        const args = body.split(" ");
        const mentionIDs = Object.keys(mentions);

        // 🛑 STOP
        if (args[1]?.toLowerCase() === "stop") {
            if (activeSpam[threadID]) {
                const blockedID = blockedUsers[threadID];
                delete activeSpam[threadID];
                delete blockedUsers[threadID];
                return api.sendMessage("🛑 Buski spam stopped successfully.", threadID);
            } else {
                return api.sendMessage("⚠️ No active spam running in this thread.", threadID);
            }
        }

        // ✅ START
        if (mentionIDs.length === 0) {
            return api.sendMessage("❗ Please tag someone to start spamming.\nUsage: /buski @tag | /buski stop", threadID);
        }

        if (activeSpam[threadID]) {
            return api.sendMessage("⚠️ Spam already running in this thread.\nUse `/buski stop` first.", threadID);
        }

        const targetID = mentionIDs[0];
        const targetName = mentions[targetID];

        activeSpam[threadID] = true;
        blockedUsers[threadID] = targetID;

        api.sendMessage(`🔥 Starting Buski spam on: ${targetName}\n\n🚫 ${targetName} is blocked from using commands.`, threadID, () => {
            startSpam(api, threadID, targetID, targetName);
        });

    } catch (err) {
        console.error("❌ Error in /buski command:", err);
        return api.sendMessage("⚠️ Something went wrong. Check console for error.", event.threadID);
    }
};

// ⛔ Prevent blocked user from using other commands
module.exports.handleEvent = function ({ api, event }) {
    const { senderID, threadID, body } = event;
    const blockedID = blockedUsers[threadID];

    if (blockedID && senderID === blockedID && body.startsWith("/")) {
        return api.sendMessage("🚫 You're being punished with gali. You can't use commands now!", threadID);
    }
};
