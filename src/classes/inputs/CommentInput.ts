import { OwnerType } from "../../enums/OwnerType";
import { CommentType } from "../../enums/CommentType";
import { RuleInput } from "./RuleInput";

export class CommentInput {
    alertId!: string[];
    index!: string[];
    comment?: string;
    type!: CommentType;
    owner!: OwnerType;
    rule!: RuleInput;
}