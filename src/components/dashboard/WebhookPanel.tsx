import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Webhook, Send, Copy, Check, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface WebhookEndpoint {
  id: string;
  name: string;
  url: string;
  status: "active" | "inactive";
  lastTriggered?: string;
}

const dummyWebhooks: WebhookEndpoint[] = [
  {
    id: "wh_001",
    name: "New UMKM Registration",
    url: "https://n8n.example.com/webhook/new-umkm",
    status: "active",
    lastTriggered: "2 minutes ago",
  },
  {
    id: "wh_002",
    name: "Credit Score Update",
    url: "https://n8n.example.com/webhook/credit-score",
    status: "active",
    lastTriggered: "15 minutes ago",
  },
  {
    id: "wh_003",
    name: "Transaction Alert",
    url: "https://n8n.example.com/webhook/transaction",
    status: "inactive",
  },
];

export const WebhookPanel = () => {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState("");
  const [testData, setTestData] = useState(JSON.stringify({
    umkm_id: "UMK001",
    name: "Tongkonan Aya",
    event: "transaction_completed",
    amount: 20000,
    timestamp: new Date().toISOString(),
  }, null, 2));
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
    toast({
      title: "Copied to clipboard",
      description: "Webhook URL copied successfully",
    });
  };

  const handleTestWebhook = async () => {
    if (!webhookUrl) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a webhook URL",
      });
      return;
    }

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: testData,
      });

      toast({
        title: "Webhook Triggered",
        description: "Test data sent successfully to n8n endpoint",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to trigger webhook. Please check the URL.",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6 shadow-card">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Webhook className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Active Webhooks</h2>
              <p className="text-sm text-muted-foreground">Configured n8n endpoints</p>
            </div>
          </div>

          <div className="space-y-3">
            {dummyWebhooks.map((webhook) => (
              <div
                key={webhook.id}
                className="p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{webhook.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 font-mono">{webhook.url}</p>
                  </div>
                  <Badge
                    className={
                      webhook.status === "active"
                        ? "bg-success text-success-foreground"
                        : "bg-muted text-muted-foreground"
                    }
                  >
                    {webhook.status}
                  </Badge>
                </div>
                {webhook.lastTriggered && (
                  <p className="text-xs text-muted-foreground">Last triggered: {webhook.lastTriggered}</p>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(webhook.url, webhook.id)}
                  className="mt-2"
                >
                  {copied === webhook.id ? (
                    <Check className="w-4 h-4 mr-2" />
                  ) : (
                    <Copy className="w-4 h-4 mr-2" />
                  )}
                  Copy URL
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-card">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
              <Send className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Test Webhook</h2>
              <p className="text-sm text-muted-foreground">Send test data to n8n</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="webhook-url">n8n Webhook URL</Label>
              <Input
                id="webhook-url"
                placeholder="https://n8n.example.com/webhook/..."
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="test-data">Test Payload (JSON)</Label>
              <textarea
                id="test-data"
                className="w-full min-h-[200px] p-3 rounded-lg border border-input bg-background font-mono text-sm"
                value={testData}
                onChange={(e) => setTestData(e.target.value)}
              />
            </div>

            <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/10 border border-accent/30">
              <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                This will send a POST request to your n8n webhook endpoint with the JSON payload above.
                Make sure your n8n workflow is configured to accept this data structure.
              </p>
            </div>

            <Button onClick={handleTestWebhook} className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Send Test Request
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
