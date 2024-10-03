const { Observable } = require ("rxjs");
const { map, pluck, filter } = require("rxjs/operators")

const users = {
    data: [
        {
            status: "active",
            age: 14
        },
        {
            status: "inactive",
            age: 17
        },
        {
            status: "active",
            age: 12
        },
        {
            status: "active",
            age: 23
        },
        {
            status: "inactive",
            age: 12
        },
    ]
}

const users2 = {
    data: [
        {
            status: "active",
            age: 14
        },
        {
            status: "inactive",
            age: 17
        },
        {
            status: "active",
            age: 32
        },
        {
            status: "active",
            age: 23
        }
    ]
}

const observable = new Observable((subscriber) => {
    subscriber.next(users2);
    //subscriber.next(users);  //hit the error stop right there so think about when programming rxjs
    //subscriber.complete();  //when hit complete finish too and do not check the rest 
    subscriber.next(users2);
    subscriber.next(users2);
}).pipe(
    pluck("data"),
    filter((value)=> value.length >= 5),
    /*map((value) => {
        //console.log("1) got data from observable",value)
        return value.data;
    })*/
    map((value) => {
        //console.log("2) got data from first observable",value)
        return value.filter((user) => user.status === "active");
    }),
    map((value) => {
        //console.log("3) got data from second observable",value)
        return value.reduce((sum, user) => sum + user.age, 0) / value.length;
    }),
    map((value) => {
        //console.log("4) got data from third observable",value)
        if(value < 18 ) throw new Error("Average is too young");
        else return value;
    })
);

const observer = {
    next:(value) => { console.log("Observer got a value of " + value);
    },
    error: (err) => {
        console.log("Observer got an error of " + err)
    },
    complete: () => {
        console.log("Observer got a complete notification");
    },
};

observable.subscribe(observer);