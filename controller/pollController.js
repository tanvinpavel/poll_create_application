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
                 res.redirect('/myPolls');
             }
         });
}

pollController.getAllPollsController = async (req, res) => {
    try{
        const allPolls = await polls.find({}, '_id title');
        // console.log(allPolls);
        res.render('displayPolls', {allPolls});
    }catch(e){
        console.log(e);
    }
}

pollController.getPollDetailsController = async (req, res) => {
    try{
        const pollDetails = await polls.findById(req.params.id, '-__v');
        const options = [...pollDetails.options];

        let result = [];
        options.forEach(option => {
            let percentage = (option.vote * 100) / pollDetails.totalVote;

            result.push({
                ...option._doc,
                percentage: percentage ? percentage.toFixed(2) : 0,
            })
        })
        
        res.render('displayPoll', {pollDetails, result});
    }catch(e){
        console.log(e);
    }
}

pollController.postPublicVoteController = async(req, res) => {
    try{
        const pollDetails = await polls.findById(req.params.id);

        let options = [...pollDetails.options];
        let index = options.findIndex(item => item.id === req.body.option);

        
        // res.send({id: index, arr: options});

        //increase each option vote
        options[index].vote = options[index].vote + 1;
        //increase total vote
        let totalVote = pollDetails.totalVote + 1;

        await polls.updateOne({_id: req.params.id}, {$set: {
            options, totalVote
        }})

        res.redirect(`/pollResult/${req.params.id}`);
    }catch(e){
        console.log(e);
    }
}

module.exports = pollController;