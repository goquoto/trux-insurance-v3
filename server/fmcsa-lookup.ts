import type { Express, Request, Response } from "express";

/**
 * FMCSA USDOT Lookup endpoint.
 * Uses the QCMobile API if FMCSA_WEBKEY is set, otherwise returns 501 (client opens SAFER).
 */
export function registerFmcsaRoute(app: Express) {
  app.get("/api/fmcsa/lookup", async (req: Request, res: Response) => {
    const dot = req.query.dot as string;
    if (!dot || !/^\d+$/.test(dot.trim())) {
      res.status(400).json({ error: "Invalid DOT number" });
      return;
    }

    const webKey = process.env.FMCSA_WEBKEY;
    if (!webKey) {
      // No key configured — client should open SAFER directly
      res.status(501).json({ error: "FMCSA_WEBKEY not configured", fallback: "safer" });
      return;
    }

    try {
      const url = `https://mobile.fmcsa.dot.gov/qc/services/carriers/${dot.trim()}?webKey=${webKey}`;
      const response = await fetch(url);

      if (!response.ok) {
        res.status(404).json({ error: "Carrier not found" });
        return;
      }

      const data = await response.json();
      const carrier = data?.content?.carrier;

      if (!carrier) {
        res.status(404).json({ error: "Carrier data not available" });
        return;
      }

      res.json({
        legalName: carrier.legalName || carrier.dbaName || "",
        cityState: `${carrier.phyCity || ""}, ${carrier.phyState || ""}`.replace(/^, |, $/, ""),
        active: carrier.allowedToOperate === "Y" || carrier.statusCode === "A",
        dotNumber: carrier.dotNumber,
        mcNumber: carrier.mcNumber || "",
      });
    } catch (err) {
      console.error("[FMCSA] Lookup failed:", err);
      res.status(500).json({ error: "FMCSA lookup failed" });
    }
  });
}
