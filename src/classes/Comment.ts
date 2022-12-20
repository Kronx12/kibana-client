import { CommentType } from "../enums/CommentType";
import { OwnerType } from "../enums/OwnerType";
import { User } from "./User";

export class Comment {
    id!: string;
    version!: string;
    type!: CommentType;
    owner!: OwnerType;
    comment?: string;
    created_at?: string;
    created_by?: User;
    pushed_at?: string;
    pushed_by?: User;
    updated_at?: string;
    updated_by?: User;
}