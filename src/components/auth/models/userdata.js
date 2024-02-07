export class UserData{
    birthday;
    displayName;
    info;
    injuries;
    photoURL;
    sex;
    staff;
    stature;
    userId;
    weight;
    static fromJson(json){
        return new UserData(
            json['birthday'],
            json['displayName'],
            json['info'],
            json['injuries'],
            json['photoURL'],
            json['sex'],
            json['staff'],
            json['stature'],
            json['userId'],
            json['weight'],
        );
    }
    toJson(){
        return JSON.parse(
            JSON.stringify({
                birthday:this.birthday,
                displayName:this.displayName,
                info:this.info,
                injuries:this.injuries,
                photoURL:this.photoURL,
                sex:this.sex,
                staff:this.staff,
                stature:this.stature,
                userId:this.userId,
                weight:this.weight,
            })
        );
    }
    constructor(birthday,
        displayName,
        info,
        injuries,
        photoURL,
        sex,
        staff,
        stature,
        userId,
        weight){
        this.birthday = birthday;
        this.displayName = displayName;
        this.info = info;
        this.injuries = injuries;
        this.photoURL = photoURL;
        this.sex = sex;
        this.staff = staff;
        this.stature = stature;
        this.userId = userId;
        this.weight = weight;
    }
}