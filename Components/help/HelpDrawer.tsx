import React from "react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, TrendingUp, Filter, Award, Shield, DollarSign, type LucideIcon } from "lucide-react";

interface HelpTopic {
	id: string;
	icon: LucideIcon;
	title: string;
	content: string;
}

const helpTopics: HelpTopic[] = [
	{
		id: "momentum",
		icon: TrendingUp,
		title: "Momentum (3/6/12 Blend)",
		content: `Momentum measures how much an ETF's price has increased over a period of time. 
    
The strategy uses a blended score combining:
• 3-month return (short-term momentum)
• 6-month return (medium-term momentum)  
• 12-month return (long-term momentum)

Each period is weighted equally (33.3%). ETFs with higher combined momentum scores rank higher for selection.

Why it works: Assets that have performed well recently tend to continue performing well in the near term — this is called the "momentum effect."`
	},
	{
		id: "trend-filter",
		icon: Filter,
		title: "Trend Filter (200-day SMA)",
		content: `The 200-day Simple Moving Average (SMA) is a long-term trend indicator.

An ETF is only eligible for selection if its current price is ABOVE its 200-day SMA. This means:
• Above SMA = uptrend = eligible
• Below SMA = downtrend = ineligible

Why it works: This filter helps avoid buying assets in clear downtrends. During major market corrections, most assets fall below their 200-day SMA, automatically shifting the portfolio to safer positions.`
	},
	{
		id: "top-3",
		icon: Award,
		title: "Top-3 Selection",
		content: `Each month, the strategy selects the top 3 eligible ETFs based on their momentum scores.

The process:
1. Calculate momentum scores for all ETFs
2. Filter out any below their 200-day SMA
3. Rank remaining ETFs by momentum
4. Select the top 3
5. Allocate equally (33.33% each)

Why 3? This balances concentration (capturing top performers) with diversification (spreading risk across multiple positions).`
	},
	{
		id: "drawdown",
		icon: Shield,
		title: "Drawdown Protection",
		content: `A drawdown is the decline from a peak to a trough in portfolio value.

This strategy reduces drawdowns through:
• Trend filter: Exits positions when they fall into downtrends
• Momentum rotation: Shifts away from weakening assets
• Multiple holdings: Diversifies across top performers

Historical benefit: While the strategy still experiences drawdowns during market stress, they tend to be shallower and recover faster than buy-and-hold approaches.`
	},
	{
		id: "tlh",
		icon: DollarSign,
		title: "Tax-Loss Harvesting (TLH)",
		content: `Tax-loss harvesting means selling investments at a loss to offset taxable gains.

How it works:
1. Identify holdings with unrealized losses
2. Sell to realize the loss
3. Immediately buy a similar (but not identical) ETF
4. Use the loss to offset gains on your tax return

Wash Sale Rule: You cannot repurchase the same security within 30 days before or after selling at a loss, or the loss is disallowed. The strategy tracks this and suggests "wash-sale safe" replacement ETFs.`
	},
];

export default function HelpDrawer() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" size="sm" className="gap-2">
					<HelpCircle className="w-4 h-4" />
					Help
				</Button>
			</SheetTrigger>
			<SheetContent className="w-full sm:max-w-lg overflow-y-auto">
				<SheetHeader>
					<SheetTitle>Strategy Guide</SheetTitle>
					<SheetDescription>
						Plain-language explanations of how the strategy works
					</SheetDescription>
				</SheetHeader>

				<div className="mt-6">
					<Accordion type="single" collapsible className="w-full">
						{helpTopics.map((topic) => {
							const IconComponent = topic.icon;
							return (
								<AccordionItem key={topic.id} value={topic.id}>
									<AccordionTrigger className="text-left">
										<div className="flex items-center gap-3">
											<div className="p-2 rounded-lg bg-indigo-100">
												<IconComponent className="w-4 h-4 text-indigo-600" />
											</div>
											<span className="text-sm font-medium">{topic.title}</span>
										</div>
									</AccordionTrigger>
									<AccordionContent>
										<div className="pl-12 pr-4 pb-2">
											<p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">
												{topic.content}
											</p>
										</div>
									</AccordionContent>
								</AccordionItem>
							);
						})}
					</Accordion>
				</div>

				<div className="mt-8 p-4 bg-indigo-50 rounded-lg">
					<p className="text-xs text-slate-600 leading-relaxed">
						<strong>Disclaimer:</strong> This is an educational tool showing how rules-based
						momentum strategies work. Past performance does not guarantee future results.
						Always consult with a financial advisor before making investment decisions.
					</p>
				</div>
			</SheetContent>
		</Sheet>
	);
}
