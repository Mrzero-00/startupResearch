import React, { useState } from 'react';
import Question from './Question';
import Result from './Result';
import Start from './Start';
import styled from 'styled-components';

const HomeDiv = styled.div`
    max-width:420px;
    width:100vw;
    height:100vh;
    margin:0 auto;
    overflow:hidden;
    display:flex;
    justify-content:center;
    align-items:center;
`

function Home () {
    const [pageNum,setPageNum] = useState(0);
    const [counting,setCounting] = useState({
        qa_1:{
            result:""
        },
        qa_2:{
            result:""
        },
        qa_3:{
            result:""
        },
        qa_4:{
            result:""
        },
        qa_5:{
            result:""
        },
        qa_6:{
            result:""
        },
        qa_7:{
            result:""
        },
        qa_8:{
            result:""
        },
        qa_9:{
            result:""
        },
        qa_10:{
            result:""
        },
    })

    const preQuestion =()=>{
        if(pageNum===1){
            alert("처음 질문 입니다.");
        }else{
            setPageNum(pre=>pre-1);
        }
    }

    const nextQuestion =()=>{
        setPageNum(pre=>pre+1);
    }

    const resetBtn=()=>{
        setPageNum(0);
        setCounting({
            yoon:0,
            lee:0,
            shim:0,
            ahn:0,
            qa_1:{
                result:""
            },
            qa_2:{
                result:""
            },
            qa_3:{
                result:""
            },
            qa_4:{
                result:""
            },
            qa_5:{
                result:""
            },
            qa_6:{
                result:""
            },
            qa_7:{
                result:""
            },
            qa_8:{
                result:""
            },
            qa_9:{
                result:""
            },
            qa_10:{
                result:""
            }
        })
    }

    return (
        <HomeDiv>
            {pageNum===0&&<Start nextQuestion={nextQuestion}></Start>}
            {(pageNum<=10&&pageNum!==0)&&<Question pageNum={pageNum}  counting={counting} setCounting={setCounting} preQuestion={preQuestion} nextQuestion={nextQuestion}></Question>}
            {pageNum===11&&<Result counting={counting} resetBtn={resetBtn}/>}
        </HomeDiv>
    );
}

export default Home;    