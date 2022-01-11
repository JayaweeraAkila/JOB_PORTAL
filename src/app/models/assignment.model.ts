import { User } from './user.model';

export class Assignment {
    assignee: any;
    assignmentStatus: string;
    candidateId: string;
    comments: Commnet[];
    id: string;
    lastUpdatedAt: string;
    logs: Log[];
}

export class Commnet {
    assignmentID: string;
    comment: string;
    createdAt: string;
    createdBy: string;
    id: string
}

export class Log {
    assignmentID: string;
    assignmentLogType: string;
    createdAt: string;
    createdBy: User;
    id: string;
    log: string
}