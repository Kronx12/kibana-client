import { Severity } from "../enums/Severity";
import { Comment } from "./Comment";
import { Connector } from "./Connector";
import { Settings } from "./Settings";
import { User } from "./User";

export class Case {
    id!: string;
    version!: string;
    comments!: Comment[];
    totalComment!: number;
    totalAlerts!: number;
    title!: string;
    tags!: string[];
    assignees!: { uuid: string; }[];
    settings!: Settings;
    owner!: string;
    description!: string;
    duration!: string;
    severity!: Severity;
    closedAt!: string;
    closedBy?: User;
    createdAt!: string;
    createdBy?: User;
    status!: string;
    updatedAt!: string;
    updatedBy?: User;
    connector!: Connector;
    externalService: any; // TODO Class ?
}
