exports.orders = [
    {_id:1,parcelOwnerId:23,parcelType:"Envelope",parcelWeight:0.01,from:"Entebbe",to:"Arua",status:"pending"},
    {_id:2,parcelOwnerId:24,parcelType:"Box",parcelWeight:10,from:"Gulu",to:"Jinja",status:"inprocess"},
    {_id:3,parcelOwnerId:25,parcelType:"Documents",parcelWeight:0.01,from:"Soroti",to:"Kampala",status: "delivered"},
    {_id:4,parcelOwnerId:26,parcelType:"Envelope",parcelWeight:0.01,from:"Mbarara",to:"Hoima",status: "delivered"},
    {_id:5,parcelOwnerId:27,parcelType:"Documents",parcelWeight:0.01,from:"Kisolo",to:"Luweero",status:"pending"},
    {_id:6,parcelOwnerId:28,parcelType:"Box",parcelWeight:20,from:"Nakasongola",to:"Kabale",status:"inprocess"},
    {_id:7,parcelOwnerId:29,parcelType:"box",parcelWeight:30,from:"Arua",to:"Entebbe",status:"pending"}
]

/*
*           *********** status *************
*       - pending --- for when order is new
*       - inprocess --- in transit to destination
*       - arrived --- arrived to the station in the destination region
*       - delivered --- got to destination
*       - cancled --- order cancled but has to have been previously on pending or inprocess
* */