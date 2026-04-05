"use client";

import { useMemo, useState } from "react";
import PanelFrame from "./components/PanelFrame";
import PanelSection from "./components/PanelSection";

const GRAFANA_BASE = "http://10.88.88.196:30173";
const DASHBOARD_UID = "7d57716318ee0dddbac5a7f451fb7753";
const DASHBOARD_SLUG = "node-exporter-nodes";

const NODES = [
  { label: "Pi 1", ip: "10.88.88.191" },
  { label: "Pi 2", ip: "10.88.88.192" },
  { label: "Pi 3", ip: "10.88.88.193" },
  { label: "Pi 4", ip: "10.88.88.194" },
  { label: "Pi 5", ip: "10.88.88.195" },
  { label: "Pi 6", ip: "10.88.88.196" },
];

function buildPanelUrl(panelId: string, nodeIp: string) {
  const instance = `${nodeIp}:9100`;

  return `${GRAFANA_BASE}/d-solo/${DASHBOARD_UID}/${DASHBOARD_SLUG}?orgId=1&from=now-1h&to=now&timezone=utc&var-datasource=prometheus&var-cluster=$__all&var-instance=${encodeURIComponent(
    instance
  )}&refresh=30s&panelId=${panelId}&__feature.dashboardScene=true`;
}

export default function Home() {
  const [selectedNodeIp, setSelectedNodeIp] = useState(NODES[0].ip);

  const selectedNode =
    NODES.find((node) => node.ip === selectedNodeIp) ?? NODES[0];

  const cpuPanels = useMemo(
    () => [
      {
        title: "CPU Usage",
        src: buildPanelUrl("panel-2", selectedNodeIp),
      },
      {
        title: "Load Average",
        src: buildPanelUrl("panel-3", selectedNodeIp),
      },
    ],
    [selectedNodeIp]
  );

  const memoryPanels = useMemo(
    () => [
      {
        title: "Memory Usage",
        src: buildPanelUrl("panel-5", selectedNodeIp),
      },
    ],
    [selectedNodeIp]
  );

  const diskPanels = useMemo(
    () => [
      {
        title: "Disk I/O",
        src: buildPanelUrl("panel-8", selectedNodeIp),
      },
      {
        title: "Disk Space Usage",
        src: buildPanelUrl("panel-9", selectedNodeIp),
      },
    ],
    [selectedNodeIp]
  );

  const networkPanels = useMemo(
    () => [
      {
        title: "Traffic Received",
        src: buildPanelUrl("panel-11", selectedNodeIp),
      },
      {
        title: "Traffic Sent",
        src: buildPanelUrl("panel-12", selectedNodeIp),
      },
    ],
    [selectedNodeIp]
  );

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Recurse Dashboard — {selectedNode.label}
          </h1>
          <p className="mt-1 text-sm text-white/60">
            Node view for {selectedNode.ip}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="node-select" className="text-sm text-white/70">
            Select node
          </label>
          <select
            id="node-select"
            value={selectedNodeIp}
            onChange={(e) => setSelectedNodeIp(e.target.value)}
            className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none"
          >
            {NODES.map((node) => (
              <option key={node.ip} value={node.ip}>
                {node.label} — {node.ip}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-6">
        <PanelSection title="CPU">
          {cpuPanels.map((panel) => (
            <PanelFrame key={panel.title} title={panel.title} src={panel.src} />
          ))}
        </PanelSection>

        <PanelSection title="Memory">
          {memoryPanels.map((panel) => (
            <PanelFrame key={panel.title} title={panel.title} src={panel.src} />
          ))}
        </PanelSection>

        <PanelSection title="Disk">
          {diskPanels.map((panel) => (
            <PanelFrame key={panel.title} title={panel.title} src={panel.src} />
          ))}
        </PanelSection>

        <PanelSection title="Network">
          {networkPanels.map((panel) => (
            <PanelFrame key={panel.title} title={panel.title} src={panel.src} />
          ))}
        </PanelSection>
      </div>
    </main>
  );
}