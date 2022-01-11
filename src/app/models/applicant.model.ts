export class Applicant {
    id: string;
    fullNameEN: string;
    fullNameJP: string;
    email: string;
    contactNo: string;
    addressEN: string;
    addressJP: string;
    bloodGroup: string;
    gender:string;
    dob: string;
    nationality: string;
    currCountry: string;
    passportNo: string;
    alienNo: string;
    referanceId: string;
    profileLanguage:string;
    password: string;
    skills : SpecialSkills;
    experiences : Experience[] = [];    
    educations : Education[] = [];
    visaExpiringDate: string;
}


export class Education {
    id: string;
    institute : string;
    course : string;
    areaOfStudy : string;
    grade : string;
    language:string;
    startDate: string;
    graduationDate: string
}


export class Experience {
    id: string;
    companyName: string;
    designation : string;
    startDate : string;
    endDate : string;
    isCurrent : boolean;
    description : string;
    language:string;
}

export class SpecialSkills { 
    id: string;
    japanese : string;
    hasWorkAuthorization : boolean;
    passedSkillTest : any[];
    planningSkillTest : string;
    otherSkills : string;
}