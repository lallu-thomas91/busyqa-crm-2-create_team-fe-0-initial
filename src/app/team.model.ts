

export interface Team{
    idTeam: number;
    teamname: String;
    teamdescr: String;
    createdby: String;
    createdOn: Date;
    memberUsernames: Array<string>;
}