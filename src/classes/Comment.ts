import { CommentType } from "../enums/CommentType";
import { OwnerType } from "../enums/OwnerType";
import { User } from "./User";

export class Comment {
    id!: string;
    version!: string;
    type!: CommentType;
    owner!: OwnerType;
    comment?: string;
    createdAt?: string;
    createdBy?: User;
    pushedAt?: string;
    pushedBy?: User;
    updatedAt?: string;
    updatedBy?: User;
}