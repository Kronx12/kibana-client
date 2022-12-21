import axios, { AxiosInstance } from 'axios';
import { OwnerType } from '../enums/OwnerType';
import { Alert } from './Alert';
import { Case } from './Case';
import { CaseStatus } from './CaseStatus';
import { Comment } from './Comment';
import { Connector } from './Connector';
import { CaseInput } from './inputs/CaseInput';
import { CommentInput } from './inputs/CommentInput';
import { build, FindCasesQuery } from './inputs/FindCasesQuery';
import { KibanaConfig } from './KibanaConfig';
import { User } from './User';

export class KibanaClient {
    instance: AxiosInstance;

    constructor(config: KibanaConfig) {
        const url: string = config.host + (config.space ? "s/" + config.space : "");
        this.instance = axios.create({
            baseURL: url,
            auth: {
                username: config.username,
                password: config.password
            },
            headers: {
                "Content-Type": "application/json",
                "kbn-xsrf": true
            }
        });
    }

    // https://www.elastic.co/guide/en/kibana/current/cases-api-add-comment.html
    addCommentToCase(caseId: string, commentInput: CommentInput): Promise<Case> {
        return new Promise(async (resolve, reject) => {
            await this.instance.post("/api/cases/" + caseId + "/comments", commentInput).then((response: any) => {
                resolve(response.data as Case);
            }).catch((error: any) => reject(error.response.data));
        });
    }

    // https://www.elastic.co/guide/en/kibana/current/cases-api-create.html
    createCase(caseInput: CaseInput): Promise<Case> {
        return new Promise<any>(async (resolve, reject) => {
            await this.instance.post("/api/cases", caseInput).then((response: any) => {
                resolve(response.data);
            }).catch((error: any) => reject(error.response));
        });
    }

    // https://www.elastic.co/guide/en/kibana/current/cases-api-delete-cases.html
    deleteCases(caseIds: string[]): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            const idsList: string = "\"" + caseIds.join("\",\"") + "\"";
            await this.instance.delete("/api/cases?ids=[" + idsList + "]").then(() => {
                resolve(true)
            }).catch((error: any) => reject(error.response.data));
        });
    }

    // https://www.elastic.co/guide/en/kibana/current/cases-api-delete-comments.html
    deleteCommentFromCase(caseId: string, commentId: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            await this.instance.delete("/api/cases/" + caseId + "/comments/" + commentId).then(() => {
                resolve(true)
            }).catch((error: any) => reject(error.response.data));
        });
    }

    // https://www.elastic.co/guide/en/kibana/current/cases-api-delete-comments.html
    deleteAllCommentsFromCase(caseId: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            await this.instance.delete("/api/cases/" + caseId + "/comments").then(() => {
                resolve(true)
            }).catch((error: any) => reject(error.response.data));
        });
    }

    // https://www.elastic.co/guide/en/kibana/current/cases-api-find-cases.html
    findCases(findCasesQuery: FindCasesQuery): Promise<Case[]> {
        return new Promise(async (resolve, reject) => {
            const cases: Case[] = [];
            await this.instance.get("/api/cases/_find" + build(findCasesQuery)).then((response: any) => {
                response.data.cases.forEach((c: Case) => cases.push(c));
            }).catch((error: any) => reject(error.response.data));
            resolve(cases);
        });
    }

    // https://www.elastic.co/guide/en/kibana/current/cases-api-find-connectors.html
    findConnectors(): Promise<Connector[]> {
        return new Promise(async (resolve, reject) => {
            const connectors: Connector[] = [];
            await this.instance.get("/api/cases/configure/connectors/_find").then((response: any) => {
                response.data.forEach((c: Connector) => connectors.push(c));
            }).catch((error: any) => reject(error.response.data));
            resolve(connectors);
        });
    }

    // https://www.elastic.co/guide/en/kibana/current/cases-api-get-alerts.html
    getCaseAlerts(caseId: string): Promise<Alert[]> {
        const alerts: Alert[] = [];
        return new Promise(async (resolve, reject) => {
            await this.instance.delete("/api/cases/" + caseId + "/comments").then((response: any) => {
                response.data.alerts.forEach((alert: Alert) => alerts.push(alert));
                resolve(alerts);
            }).catch((error: any) => reject(error.response.data));
        });
    }

    // https://www.elastic.co/guide/en/kibana/current/cases-api-get-case.html
    getCase(caseId: string, includeComments: boolean = true): Promise<Case> {
        return new Promise(async (resolve, reject) => {
            await this.instance.get("/api/cases/" + caseId + "?includeComments=" + includeComments).then((response: any) => {
                resolve(response.data as Case);
            }).catch((error: any) => reject(error.response.data));
        });
    }

    // https://www.elastic.co/guide/en/kibana/current/cases-api-get-status.html
    getCaseStatus(caseId: string, owners?: OwnerType[]): Promise<CaseStatus> {
        return new Promise(async (resolve, reject) => {
            const ownersList: string = owners ? "?owner=[\"" + owners.join("\",\"") + "\"]" : "";
            await this.instance.get("/api/cases/" + caseId + ownersList).then((response: any) => {
                resolve(response.data as CaseStatus);
            }).catch((error: any) => reject(error.response.data));
        });
    }

    // https://www.elastic.co/guide/en/kibana/current/cases-api-get-cases-by-alert.html
    getCasesByAlert(alertId: string, owners?: OwnerType[]): Promise<CaseStatus> {
        return new Promise(async (resolve, reject) => {
            const cases: {id: string, title: string}[] = [];
            const ownersList: string = owners ? "?owner=[\"" + owners.join("\",\"") + "\"]" : "";
            await this.instance.get("/api/cases/alerts/" + alertId + ownersList).then((response: any) => {
                response.data.cases.forEach((c: {id: string, title: string}) => cases.push(c));
                resolve(response.data as CaseStatus);
            }).catch((error: any) => reject(error.response.data));
        });
    }

    // https://www.elastic.co/guide/en/kibana/current/cases-api-get-comments.html
    getCaseComment(caseId: string, commentId: string): Promise<Comment> {
        return new Promise(async (resolve, reject) => {
            await this.instance.get("/api/cases/" + caseId + "/comments/" + commentId).then((response: any) => {
                resolve(response.data as Comment);
            }).catch((error: any) => reject(error.response.data));
        });
    }

    // TODO https://www.elastic.co/guide/en/kibana/current/cases-get-configuration.html

    // https://www.elastic.co/guide/en/kibana/current/cases-api-get-comments.html
    getReporters(owners?: OwnerType[]): Promise<User[]> {
        const reporters: User[] = [];
        return new Promise(async (resolve, reject) => {
            const ownersList: string = owners ? "?owner=[\"" + owners.join("\",\"") + "\"]" : "";
            await this.instance.get("/api/cases/reporters" + ownersList).then((response: any) => {
                response.data.forEach((u: User) => reporters.push(u));
                resolve(reporters);
            }).catch((error: any) => reject(error.response.data));
        });
    }

    // https://www.elastic.co/guide/en/kibana/current/cases-api-get-tag.html
    getTags(owners?: OwnerType[]): Promise<string[]> {
        return new Promise(async (resolve, reject) => {
            const ownersList: string = owners ? "?owner=[\"" + owners.join("\",\"") + "\"]" : "";
            await this.instance.get("/api/cases/tags" + ownersList).then((response: any) => {
                resolve(response.data);
            }).catch((error: any) => reject(error.response.data));
        });
    }
}