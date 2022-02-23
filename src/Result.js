import React, { useEffect, useState } from 'react';
import styled,{css}from 'styled-components';
import result_bg from './img/result_bg.svg';
const ResultPage = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:100vw;
    height:100vh;
    overflow-y:scroll;
    background-color:#f7f7f7;
    color:#000;

    h1{
        font-size:1.25rem;
        font-weight:400;
    }

    h2{
        margin-top:23px;
        margin-bottom:38px;
        font-size:3.5rem;
    }
`;

const ResultBg = styled.div`
    position:absolute;
    width:100vw;
    left:0px;
    height:133px;
    background:url(${result_bg});
    bottom:0px;
    ${props=>props.up&&css`
        top:0px;  
    `}
`;

const Btn = styled.button`
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:#A586D9;
    padding:1rem 1rem;
    border:none;
    width:160px;
    height:56px;
    color:#fff;
    border-radius:4px;
    font-size:1.25rem;
    &+&{
        margin-top:10px;
    }
    ${props=>props.state&&css`
        background-color:#5704E2;
    `
    }
`;

function Result ({counting,resetBtn}) {
    const [yourChoise,setYourChoise] = useState("");

    const scoreLogic=(num)=>{
        if(num===1){
            return 3;
        }else if(num===2){
            return 7;
        }else if(num===3){
            return 3;
        }else if(num===4){
            return 5;
        }else if(num===5){
            return 5;
        }else if(num===6){
            return 7;
        }else if(num===7){
            return 3;
        }else if(num===8){
            return 5;
        }else if(num===9){
            return 4;
        }else if(num===10){
            return 6;
        }

    }

    const countingLogic = (counting)=>{
        let yoon=0,lee=0,shim=0,ahn=0 ;
        let who;
        for(let i = 1 ; i<=10 ; i++){
            if(counting[`qa_${i}`].result==="yoon"){
                yoon+= scoreLogic(i);
            }else if(counting[`qa_${i}`].result==="lee"){
                lee+=scoreLogic(i);
            }else if(counting[`qa_${i}`].result==="shim"){
                shim+=scoreLogic(i);
            }else if(counting[`qa_${i}`].result==="ahn"){
                ahn+=scoreLogic(i);
            }
            console.log(yoon,lee,shim,ahn);
        }
        
        if(yoon>lee){
            if(yoon>shim){
                if(yoon>ahn){
                    who="yoon";
                }else{
                    who="ahn";
                }
            }else{
                if(shim>ahn){
                    who="shim";
                }else{
                    who="ahn";
                }
            }
        }else{
            if(lee>shim){
                if(lee>ahn){
                    who="lee";
                }else{
                    who="ahn";
                }
            }else{
                if(shim>ahn){
                    who="shim";
                }else{
                    who="ahn";
                }
            }
        }
        return who;

    }

    const clip=()=>{
        var url = '';
        var textarea = document.createElement("textarea");
        document.body.appendChild(textarea);
        url = window.document.location.href;
        textarea.value = url;
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert("URL이 복사되었습니다.")
    }

    useEffect(()=>{
        setYourChoise(countingLogic(counting));
    },[])

    return (
        <ResultPage>
            <h1>당신의 선택은</h1>
            {yourChoise==="yoon"&&<h2>윤석열</h2>}
            {yourChoise==="lee"&&<h2>이재명</h2>}
            {yourChoise==="shim"&&<h2>심상정</h2>}
            {yourChoise==="ahn"&&<h2>안철수</h2>}
            <Btn onClick={resetBtn} state>다시하기</Btn>
            <Btn onClick={clip}>공유하기</Btn>
            <ResultBg up/>
            <ResultBg/>
        </ResultPage>
    );
}

export default Result;    