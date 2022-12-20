import axios, { AxiosInstance } from 'axios';
import { OwnerType } from '../enums/OwnerType';
import { Alert } from './Alert';
import { Case } from './Case';
import { CaseStatus } from './CaseStatus';
import { Comment } from './Comment';
import { CaseInput } from './inputs/CaseInput';
import { CommentInput } from './inputs/CommentInput';
import { KibanaConfig } from './KibanaConfig';
import { User } from './User';

export class KibanaClient {
    instance: AxiosInstance;

    constructor(config: KibanaConfig) {
        let url: string = config.host + (config.space ? "s/" + config.space : "");
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
    addCommentToCase(case_id: string, comment_input: CommentInput): Promise<Case> {
        return new Promise(async (resolve, reject) => {
            await this.instance.post("/api/cases/" + case_id + "/comments", comment_input).then((response: any) => {
                resolve(response.data as Case);
            }).catch((error: any) => reject(error.response.data));
        });
    }

    // https://www.elastic.co/guide/en/kibana/current/cases-api-create.html
    createCase(case_input: CaseInput): Promise<Case> {
        return new Promise<any>(async (resolve, reject) => {
            await this.instance.post("/api/cases", case_input).then((response: any) => {
                resolve(response.data);
            }).catch((error: any) => reject(error.response));
        });
    }

    // https://www.elastic.co/guide/en/kibana/current/cases-api-delete-cases.html
    deleteCases(case_ids: Array<string>): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            let ids_list: string = "\"" + case_ids.join("\",\"") + "\"";
            await this.instance.delete("/api/cases?ids=[" + ids_list + "]").then(() => {
                resolve(true)
            }).catch((error: any) => reject(error.response.data));
        });
    }

    // https://www.elastic.co/guide/en/kibana/current/cases-api-delete-comments.html
    deleteCommentFromCase(case_id: string, comment_id: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            await this.instance.delete("/api/cases/" + case_id + "/comments/" + comment_id).then(() => {
                resolve(true)
            }).catch((error: any) => reject(error.response.data));
        });
    }

    // https://www.elastic.co/guide/en/kibana/current/cases-api-delete-comments.html
    deleteAllCommentsFromCase(case_id: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            await this.instance.delete("/api/cases/" + case_id + "/comments").then((response: any) => {
                resolve(true)
            }).catch((error: any) => reject(error.response.data));
        });
    }

    // TODO https://www.elastic.co/guide/en/kibana/current/cases-api-find-cases.html
    // getCases(): Promise<Array<Case>> {
    //     return new Promise(async (resolve, reject) => {
    //         let cases: Array<Case> = Array<Case>();
    //         await this.instance.get("/api/cases/_find").then((response: any) => {
    //             response.data.cases.forEach((c: Case) => cases.push(c));
    //         }).catch((error: any) => reject(error.response.data));
    //         resolve(cases);
    //     });
    // }

    // TODO https://www.elastic.co/guide/en/kibana/current/cases-api-find-connectors.html

    // https://www.elastic.co/guide/en/kibana/current/cases-api-get-alerts.html
    getCaseAlerts(case_id: string): Promise<Array<Alert>> {
        let alerts: Array<Alert> = new Array();
        return new Promise(async (resolve, reject) => {
            await this.instance.delete("/api/cases/" + case_id + "/comments").then((response: any) => {
                response.data.alerts.forEach((alert: Alert) => alerts.push(alert));
                resolve(alerts);
            }).catch((error: any) => reject(error.response.data));
        });
    }

    // https://www.elastic.co/guide/en/kibana/current/cases-api-get-case.html
    getCase(case_id: string, includeComments: boolean = true): Promise<Case> {
        return new Promise(async (resolve, reject) => {
            await this.instance.get("/api/cases/" + case_id + "?includeComments=" + includeComments).then((response: any) => {
                resolve(response.data as Case);
            }).catch((error: any) => reject(error.response.data));
        });
    }

    // https://www.elastic.co/guide/en/kibana/current/cases-api-get-status.html
    getCaseStatus(case_id: string, owners?: Array<OwnerType>): Promise<CaseStatus> {
        return new Promise(async (resolve, reject) => {
            let owners_list: string = owners ? "?owner=[\"" + owners.join("\",\"") + "\"]" : "";
            await this.instance.get("/api/cases/" + case_id + owners_list).then((response: any) => {
                resolve(response.data as CaseStatus);
            }).catch((error: any) => reject(error.response.data));
        });
    }

    // https://www.elastic.co/guide/en/kibana/current/cases-api-get-cases-by-alert.html
    getCasesByAlert(alert_id: string, owners?: Array<OwnerType>): Promise<CaseStatus> {
        return new Promise(async (resolve, reject) => {
            let cases: Array<{id: string, title: string}> = Array();
            let owners_list: string = owners ? "?owner=[\"" + owners.join("\",\"") + "\"]" : "";
            await this.instance.get("/api/cases/alerts/" + alert_id + owners_list).then((response: any) => {
                response.data.cases.forEach((c: {id: string, title: string}) => cases.push(c));
                resolve(response.data as CaseStatus);
            }).catch((error: any) => reject(error.response.data));
        });
    }

    // https://www.elastic.co/guide/en/kibana/current/cases-api-get-comments.html
    getCaseComment(case_id: string, comment_id: string): Promise<Comment> {
        return new Promise(async (resolve, reject) => {
            await this.instance.get("/api/cases/" + case_id + "/comments/" + comment_id).then((response: any) => {
                resolve(response.data as Comment);
            }).catch((error: any) => reject(error.response.data));
        });
    }

    // TODO https://www.elastic.co/guide/en/kibana/current/cases-get-configuration.html

    // https://www.elastic.co/guide/en/kibana/current/cases-api-get-comments.html
    getReporters(owners?: Array<OwnerType>): Promise<Array<User>> {
        let reporters: Array<User> = Array();
        return new Promise(async (resolve, reject) => {
            let owners_list: string = owners ? "?owner=[\"" + owners.join("\",\"") + "\"]" : "";
            await this.instance.get("/api/cases/reporters" + owners_list).then((response: any) => {
                response.data.forEach((u: User) => reporters.push(u));
                resolve(reporters);
            }).catch((error: any) => reject(error.response.data));
        });
    }

    // https://www.elastic.co/guide/en/kibana/current/cases-api-get-tag.html
    getTags(owners?: Array<OwnerType>): Promise<Array<string>> {
        return new Promise(async (resolve, reject) => {
            let owners_list: string = owners ? "?owner=[\"" + owners.join("\",\"") + "\"]" : "";
            await this.instance.get("/api/cases/tags" + owners_list).then((response: any) => {
                resolve(response.data);
            }).catch((error: any) => reject(error.response.data));
        });
    }
}