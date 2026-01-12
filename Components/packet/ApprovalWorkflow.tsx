import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Check, FileCheck, Download, AlertTriangle, MessageSquare, Clock, User } from "lucide-react";

type WorkflowStatus = "PROPOSED" | "APPROVED" | "EXECUTED" | "CANCELED";
type InternalStatus = "pending" | "reviewed" | "approved";

interface ApprovalWorkflowProps {
	status?: WorkflowStatus;
}

function mapStatusToInternal(status: WorkflowStatus): InternalStatus {
	switch (status) {
		case "PROPOSED":
			return "pending";
		case "APPROVED":
		case "EXECUTED":
			return "approved";
		case "CANCELED":
			return "pending";
		default:
			return "pending";
	}
}

export default function ApprovalWorkflow({ status = "PROPOSED" }: ApprovalWorkflowProps) {
	const [currentStatus, setCurrentStatus] = useState<InternalStatus>(mapStatusToInternal(status));
	const [notes, setNotes] = useState<string>("");
	const [deviationReason, setDeviationReason] = useState<string>("");
	const [showDeviation, setShowDeviation] = useState<boolean>(false);

	const handleReview = () => {
		setCurrentStatus("reviewed");
	};

	const handleApprove = () => {
		setCurrentStatus("approved");
	};

	return (
		<Card className="p-5 bg-white border-slate-200">
			<h3 className="text-sm font-semibold text-slate-900 mb-4">Approval Workflow</h3>

			{/* Status */}
			<div className="flex items-center gap-2 mb-6">
				<span className="text-sm text-slate-600">Status:</span>
				<Badge
					className={`${currentStatus === "approved"
						? "bg-emerald-100 text-emerald-700"
						: currentStatus === "reviewed"
							? "bg-blue-100 text-blue-700"
							: "bg-amber-100 text-amber-700"
						}`}
				>
					{currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
				</Badge>
			</div>

			{/* Action Buttons */}
			<div className="flex flex-wrap gap-3 mb-6">
				<Button
					variant={currentStatus === "reviewed" || currentStatus === "approved" ? "outline" : "default"}
					onClick={handleReview}
					disabled={currentStatus === "reviewed" || currentStatus === "approved"}
					className="gap-2"
				>
					<Check className="w-4 h-4" />
					Mark as Reviewed
				</Button>

				<Button
					variant={currentStatus === "approved" ? "outline" : "default"}
					onClick={handleApprove}
					disabled={currentStatus !== "reviewed"}
					className="gap-2 bg-emerald-600 hover:bg-emerald-700"
				>
					<FileCheck className="w-4 h-4" />
					Approve Packet
				</Button>

				<Button variant="outline" className="gap-2">
					<Download className="w-4 h-4" />
					Export Orders
				</Button>
			</div>

			{/* Add Note */}
			<div className="mb-6">
				<label className="text-sm font-medium text-slate-700 mb-2 block">Notes</label>
				<Textarea
					placeholder="Add notes about this rebalance..."
					value={notes}
					onChange={(e) => setNotes(e.target.value)}
					className="h-24"
				/>
			</div>

			{/* Record Deviation */}
			<Dialog open={showDeviation} onOpenChange={setShowDeviation}>
				<DialogTrigger asChild>
					<Button variant="outline" className="gap-2 w-full border-amber-200 text-amber-700 hover:bg-amber-50">
						<AlertTriangle className="w-4 h-4" />
						I Deviated from Recommendations
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Record Deviation</DialogTitle>
						<DialogDescription>
							Document any changes you made that differ from the AI recommendations.
						</DialogDescription>
					</DialogHeader>
					<Textarea
						placeholder="Describe what you changed and why..."
						value={deviationReason}
						onChange={(e) => setDeviationReason(e.target.value)}
						className="h-32"
					/>
					<DialogFooter>
						<Button variant="outline" onClick={() => setShowDeviation(false)}>Cancel</Button>
						<Button onClick={() => setShowDeviation(false)}>Save Deviation</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Audit Info */}
			<div className="mt-6 pt-4 border-t border-slate-200 space-y-2">
				<div className="flex items-center gap-2 text-sm text-slate-600">
					<User className="w-4 h-4 text-slate-400" />
					<span>Reviewer:</span>
					<span className="font-medium text-slate-900">Alex</span>
				</div>
				{currentStatus !== "pending" && (
					<div className="flex items-center gap-2 text-sm text-slate-600">
						<Clock className="w-4 h-4 text-slate-400" />
						<span>Last action:</span>
						<span className="font-medium text-slate-900">Just now</span>
					</div>
				)}
			</div>
		</Card>
	);
}
