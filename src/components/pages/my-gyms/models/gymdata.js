export class GymData{
    constructor(name,description,ownerId,photoName,photoURL){
        this.name = name;
        this.description = description;
        this.ownerId = ownerId;
        this.photoName = photoName;
        this.photoURL = photoURL;
    }
    static fromJson(json){
        return new GymData(json['name'],json['description'],json['ownerId'],json['photoName'],json['photoURL']);
    }
    toJson(){
        return {
            name:this.name,
            description:this.description,
            ownerId:this.ownerId,
            photoName:this.photoName,
            photoURL:this.photoURL,
        }
    }
}