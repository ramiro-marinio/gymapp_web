export class GymData{
    constructor(id,name,description,ownerId,photoName,photoURL){
        this.id = id;
        this.name = name;
        this.description = description;
        this.ownerId = ownerId;
        this.photoName = photoName;
        this.photoURL = photoURL;
    }
    static fromJson(json){
        return new GymData(json['id'],json['name'],json['description'],json['ownerId'],json['photoName'],json['photoURL']);
    }
    toJson(){
        return JSON.parse(JSON.stringify({
            id:this.id,
            name:this.name,
            description:this.description,
            ownerId:this.ownerId,
            photoName:this.photoName,
            photoURL:this.photoURL,
        }));
    }
}