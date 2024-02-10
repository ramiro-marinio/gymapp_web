
export class DemonstrationData{
    constructor(gymId,id,exerciseName,description,repUnit,workAreas,advice,resourceName,resourceURL){
        this.gymId = gymId;
        this.id = id;
        this.exerciseName = exerciseName;
        this.description = description;
        this.repUnit = repUnit;
        this.workAreas = workAreas;
        this.advice = advice;
        this.resourceName = resourceName;
        this.resourceURL = resourceURL;
    }
    static fromJson(json){
        return new DemonstrationData(
            json.gymId,
            json.id,
            json.exerciseName,
            json.description,
            json.repUnit,
            json.workAreas,
            json.advice,
            json.resourceName,
            json.resourceURL,
        );
    }
    toJson(){
        return {
            gymId:this.gymId,
            id:this.id,
            exerciseName:this.exerciseName,
            description:this.description,
            repUnit:this.repUnit,
            workAreas:this.workAreas,
            advice:this.advice,
            resourceName:this.resourceName,
            resourceURL:this.resourceURL,
        }
    }
}