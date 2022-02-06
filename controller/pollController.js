const polls = require('../model/pollModel');
//module scaffolding
const pollController = {};

pollController.getPollController = (req, res) => {
    res.render('createPoll');
}

pollController.postPollController = (req, res) => {
    let {title, description, options} = req.body;
    
    options = options.map(opt => {
        return {
            name: opt
        }
    });

    const newPoll = new polls({
        title,
        description,
        options
    });

    // console.log(newPoll);
         newPoll.save((err)=>{
             if(err){
                 res.status(500).send(err);
            }else{
                 res.render('createPoll');
             }
         });
}

module.exports = pollController;