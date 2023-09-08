import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import {Configuration,OpenAIApi} from 'openai'

dotenv.config();

const configuration=new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai=new OpenAIApi(configuration);
const app=express();
app.use(cors());
app.use(express.json());// it will help us to connect our frontend with backend


app.get('/',async(req,res)=>{
    res.status(200).send({
        message:'Hello from codeX',
    })

})

app.post('/',async(req,res)=>{
    try{
        const prompt =req.body.prompt;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
                // authenticates & returns the openai module, which has the following functions:\nopenai.Completion.create(\n    prompt=\"<my prompt>\", # The prompt to start completing from\n    max_tokens=123, # The max number of tokens to generate\n    temperature=1.0 # A measure of randomness\n    echo=True, # Whether to return the prompt in addition to the generated completion\n)\n\"\"\"\nimport util\n\"\"\"\nCreate an OpenAI completion starting from the prompt \"Once upon an AI\", no more than 5 tokens. Does not include the prompt.\n\"\"\"\n",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
            
          });
          res.status(200).send({bot:response.data.choices[0].text
          })

          }
          catch(error){
            console.log(error);
            res.status(500).send({error})
          }


        })


 app.listen(5000,()=>console.log("ggvgvhv server started on localhost:5000"));      
    
