export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  var b = req.body || {};
  var msg = "**New AI Ops Audit Submission**\n" +
    "**Name:** " + (b.name || "?") + "\n" +
    "**Company:** " + (b.company || "?") + "\n" +
    "**Industry:** " + (b.industry || "?") + "\n" +
    "**Team Size:** " + (b.team_size || "?") + "\n" +
    "**Email:** " + (b.email || "?") + "\n\n" +
    "**Tools:** " + (b.tools || "N/A") + "\n" +
    "**Time Sink:** " + (b.time_sink || "N/A") + "\n" +
    "**AI Experience:** " + (b.ai_attempts || "N/A") + "\n" +
    "**Magic Wand:** " + (b.magic_wand || "N/A") + "\n" +
    (b.other ? ("**Notes:** " + b.other + "\n") : "");

  var webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: msg })
      });
    } catch (e) { console.error("webhook failed", e); }
  }
  return res.status(200).json({ ok: true, message: "Submission received" });
}
