import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from '../ProgressBar/ProgressBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const Introduction = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const questions = useSelector(store => store.questions.questions);
    // const [introductionQuestions, setIntroductionQuestions] = useState([]);
    const [introductionQuestionChoices, setIntroductionQuestionChoices] = useState([]);
    const [response, setResponse] = useState('');
    const user = useSelector((store) => store.user);

    // Manually set section id on each page - could use section table on database to trigger in the future
    // Manually setting question range - should use math later
    const sectionId = 1;
    const [low, setLow] = useState(1);
    const [high, setHigh] = useState(5);

    useEffect(() => {
        getIntroductionQuestions();
    }, []);

    // // Get the questions
    // const getIntroductionQuestions = () => {
    //     // console.log('In getIntroductionQuestions');
    //     axios.get(`/api/question/${sectionId}`)
    //         .then((response) => {
    //             setIntroductionQuestions(response.data);
    //             getIntroductionQuestionChoices();
    //         }).catch((error) => {
    //             console.log(error);
    //             alert('Something went wrong.');
    //         });
    // };
    const getIntroductionQuestions = () => {
        dispatch({ type: 'FETCH_QUESTIONS', payload: { sectionId } });
    }

    // // Get the choices
    // const getIntroductionQuestionChoices = () => {
    //     axios.get(`/api/choice/${low}/${high}`)
    //         .then((response) => {
    //             setIntroductionQuestionChoices(response.data);
    //         }).catch((error) => {
    //             console.log(error);
    //             alert('Something went wrong.');
    //         });
    // };

    // const postIntroductionResponses = () => {
    //     console.log('in postIntroductionResponses');
    //     axios.post(`/api/response/${user.id}`, { data: `('1', 'Test Company', '${user.id}'), ('2', 'Test Name', '${user.id}'), ('3', 'Test Email', '${user.id}'), ('4', 'Test State', '${user.id}'), ('5', 'Test Website', '${user.id}')` })
    //         .then(() => {
    //             history.push('/team')
    //         }).catch((error) => {
    //             console.log(error);
    //             alert('Something went wrong!');
    //         });
    // };

    return (
        <center>
            <Box>
                <ProgressBar step={1} />
                <h2>Introduction</h2>
                <p>On refresh, we get an "Each child in a list" key error for the Progress Bar and page - doesn't happen on normal access of page</p>
                {questions.map(question => {
                    // check if question.id matches a choice.question_id
                    let choiceCheck = false;
                    for (let i = 0; i < introductionQuestionChoices.length; i++) {
                        if (question.id === introductionQuestionChoices[i].question_id) {
                            choiceCheck = true;
                        }
                    }
                    return (
                        <>
                            <h4>{question.question}</h4>
                            {choiceCheck ?
                                <Select
                                    value={response}
                                    onChange={(event) => setResponse(event.target.value)}
                                >
                                    {introductionQuestionChoices.map(choice => {
                                        if (choice.question_id === question.id) {
                                            return (
                                                <MenuItem>{choice.choice}</MenuItem>
                                            )
                                        }
                                    })}
                                </Select>
                                :
                                <TextField></TextField>}
                        </>
                    )
                })}
                <br />
                <Button onClick={() => history.push('/start')}>Cancel</Button>
                <Button onClick={() => postIntroductionResponses()}>Continue</Button>
            </Box>
        </center>
    )
}

export default Introduction;