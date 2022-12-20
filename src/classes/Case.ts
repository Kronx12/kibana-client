import { Severity } from "../enums/Severity";
import { Comment } from "./Comment";
import { Connector } from "./Connector";
import { Settings } from "./Settings";
import { User } from "./User";

export class Case {
    id!: string;
    version!: string;
    comments!: Array<Comment>;
    totalComment!: number;
    totalAlerts!: number;
    title!: string;
    tags!: Array<string>;
    assignees!: Array<{ uuid: string; }>;
    settings!: Settings;
    owner!: string;
    description!: string;
    duration!: string;
    severity!: Severity;
    closed_at!: string;
    closed_by?: User;
    created_at!: string;
    created_by?: User;
    status!: string;
    updated_at!: string;
    updated_by?: User;
    connector!: Connector;
    external_service: any; // TODO Class ?
}
