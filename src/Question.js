import React, { useEffect, useState } from 'react';
import styled, { css,keyframes } from 'styled-components';

const fadeIn = keyframes`
    0%{
        opacity:0;
    }
    50%{
        opacity:1;
    }
    100%{
        opacity:0;
    }
`

const QaBox= styled.div`
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        width:100%;
        height:40%;
        overflow-y:scroll;
        background-color:#f7f7f7;
        color:#000;
        border-radius:0px 0px 8px 8px;
        .qa{
            font-size:2rem;
            font-weight:600;
        }
        .qaGage{
            width:90%;
            height:4px;
            position:absolute;
            top:1rem;
            padding:1rem 0rem;
            display:flex;
            justify-content:space-between;
        }
` 

const QaGageItem = styled.div`
    width:10%;
    background:#DECAFF;
    &+&{
        margin-left:1px;
    }
    ${props=>props.state&&css`
        background:#5704E2;
    `}
`

const BtnList = styled.div`
    display:flex;
    width:100%;
`

const ModalWindow = styled.div`
    width:200px;
    height:60px;
    background-color:#fff;
    border-radius: 8px;
    box-shadow: 1px 1px 1px rgba(0,0,0,0.3);
    color:#000;
    font-size:1rem;
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    display:flex;
    justify-content: center;
    align-items:center;
    animation-duration : 1000ms;
    animation-timing-function: ease-out;
    animation-name:${fadeIn};
    animation-fill-mode:forwards;

`

const Btn = styled.div`
    display:flex;
    justify-content:center;
    background-color:#A586D9;
    padding:1rem 1rem;
    border:none;
    width:50%;
    color:#fff;
    font-size:1.5rem;
    &+&{
        border-left:1px solid #fff;
    }
    ${props=>props.state&&css`
        background-color:#5704E2;
    `
    }
`

const QaPage= styled.div`
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        width:100vw;
        height:100vh;
        overflow-y:scroll;
        background-color:#f7f7f7;
        color:#fff;

        h1{
            font-size:2rem;
        }

        button{
            padding:0.5rem 1rem;
        }
`

const ChoiceBox = styled.div`
        display:flex;
        flex-direction:column;
        align-items:center;
        width:100%;
        height:100%;
        overflow-y:scroll;
        background-color:#f7f7f7;
        color:#fff;
        padding-top:1rem;

        button{
            background-color:transparent;
            width:90%;
            padding:1.25rem 1rem;
            border:none;
            border-radius:8px;
            color:#000;
            font-size:0.85rem;
            text-align:left;
            line-height:1.3;
            background-color:#fff;
            box-shadow:0px 4px 4px rgba(0, 0, 0, 0.05);
        }
        button+button{
            margin-top:10px;
        }
`

function Question ({pageNum,counting,setCounting,preQuestion,nextQuestion}) {
    const [modalState,setModalState] = useState(false);
    const qusestionList=[
        {
            id:1,
            qa:"정부 역할론",
            qa_1:'"기술혁명 시대에는 정부가 나서서 산업을 육성시킨다는 것보단 민간 분야에서 자율적인 기업 활동을 할 수 있도록 정부는 여건을 만들어줘야 한다"',//yoon
            qa_2:'"스타트업이 자유롭게 창의와 혁신을 실천하도록 기회를 주려면 정부의 적극적인 책임 이행이 필요하다"',//lee
            qa_3:'"none"',//shim
            qa_4:'"규제개혁처를 만들어 여러 방법을 동원해 규제를 없애고, 정해진 것 외 불가능한 포지티브 규제를 모두 금지한 것 아니면 모두 허용하는 네거티브 규제 시스템으로 바꿀 것"',//ahn
        },
        {
            id:2,
            qa:"규제 관련",
            qa_1:'"정치가 자유로운 기업 활동을 방해하지 않아야 한다고 생각한다"',//yoon
            qa_2:'"과도한 규제, 일종의 진입장벽이 창업 성장을 훼손하고 있다. 금지된 것 이외에는 자유롭게 활동할 수 있는 산업 환경을 만들어내야 한다"',//lee
            qa_3:'"none"',//shim
            qa_4:'“인간의 생명과 안전에 대한 규제는 오히려 촘촘하게 강화하고, 신산업에 대한 규제는 몇 가지 하면 안 되는 것만 지정하고 나머지는 다 해도 괜찮은 네거티브 규제로 바꿔야한다”',//ahn
        },
        {
            id:3,
            qa:"공정의 관해",
            qa_1:'"작은 기업부터 대기업으로 성장하고 가치를 창출해낼 기회가 제대로 부여되는 사회가 공정한 사회"',//yoon
            qa_2:'“대기업과 중소기업, 자본과 노동이 상생·협력하는 공정한 성장이 저성장의 늪에서 벗어날 해법”',//lee
            qa_3:'80%에 달하는 청년들에겐 주어지지 않는 공정입니다. 저는 ‘청년기초자산제’ ‘비정규직 평등수당’ ‘최소노동시간 보장제’ ‘공공기관 청년고용의 무할당제’ 확대로 기울어진 운동장을 바로잡기 위해 노력하겠습니다."',//shim
            qa_4:'none',//ahn
        },
        {
            id:4,
            qa:"청년 창업 정책",
            qa_1:'"20~30대를 위해 대학을 창업 기지화하여 학생수 감소에 따른 여유 인프라를 대학창업기지로 전환해 창업가를 양성한다"',//yoon
            qa_2:'“벤처 기업 선배들과 정부가 1조원 규모의 창업연대기금을 만들어서 실패해도 재기할 수 있는 안전망을 만들겠다”',//lee
            qa_3:'none',//shim
            qa_4:'none',//ahn
        },
        {
            id:5,
            qa:"창업 인프라 투자",
            qa_1:'"벤처기업 스톡옵션 비과세 한도를 현행 3천만원에서 2억원으로 높이는 등 각종 유인책을 확대하겠다"',//yoon
            qa_2:'“2027년까지 정부의 벤처투자 예산을 10조 원으로 확대하고 연 30만 곳의 신기술·신산업 창업을 유도하겠다”',//lee
            qa_3:'none',//shim
            qa_4:'"4차 산업혁명에 필요한 기술과 소재·부품·장비 국산화 등 중소기업의 새로운 성장동력을 육성하기 위해 5년간 이들 분야에 1조원 이상을 지원하겠다"',//ahn
        },
        {
            id:6,
            qa:"일자리에 대해",
            qa_1:'"국민행복시대는 일자리에서 시작하고, 일자리야 말로 최고의 복지"',//yoon
            qa_2:'"기업이 늘어나고 성장해야 일자리도 많아진다"',//lee
            qa_3:'"청년 일자리 정책의 대표 공약으로 ‘국가 일자리보장제’를 제안한다. 일자리보장제는 원하는 모든 청년에게 생활임금과 사회보험, 이직 준비와 교육을 제공하는 일자리를 국가가 제공하는 제도이다."',//shim
            qa_4:'"일자리를 찾는 것과 지원정보를 제공하는 건 구직자, 사업체 모두 필요한 일이다. 지방정부와 지역에 있는 대학이 연계하여 지방의 우수 인재를 확보하고, 지방 인재에는 좋은 일자리 정보를 제공할 수 있도록 협력 프로세스 구축을 적극 지원하겠다.”',//ahn
        },
        {
            id:7,
            qa:"워라벨에 대해",
            qa_1:'“급격한 최저임금 인상 여파는 일자리 실종과 소득감소로 이어졌다”',//yoon
            qa_2:'(주 4일제 근무 도입) “공약이라고 확신은 못 하지만 언젠가는 가야 할 길”',//lee
            qa_3:'‘시간빈곤’으로 인한 여가·휴식시간 부족은 생산성 저하뿐만 아니라 또다른 불평등을 야기하고 있습니다. 주4일제를 도입해 시간빈곤 대한민국을 극복할 때입니다.',//shim
            qa_4:'none',//ahn
        },
        {
            id:8,
            qa:"성장에 대해",
            qa_1:'"강한 국가는 대기업뿐 아니라 강소기업을 얼마나 보유하고 있느냐에 따라 달렸다”',//yoon
            qa_2:'"저성장을 전제로 모든 정책을 수립하는 것을 넘어 성장을 회복해야 한다","성장을 회복하면 기회가 늘어나고. 기회가 늘어나면 경쟁이 완화된다”',//lee
            qa_3:'지역을 중심으로 R&D투자와 지역녹색전환을 강력하게 추진해 지역소멸이라는 국가적 난관을 해결하는 동시에 지역산업 부활로 지역균형의 돌파구를 찾겠다.”',//shim
            qa_4:'none',//ahn
        },
        {
            id:9,
            qa:"비수도권 군형",
            qa_1:'100여개 공공기관의 2차 이전을 추진하되, 무조건 할당식보다는 지역특성과 지역 부합성을 최대한 고려하고 정주여건을 동시에 마련하며 이전해야 할 것이다.',//yoon
            qa_2:'“균형발전과 수도권 인구집중 해소를 위해 현재 수도권에 있는 공기업과 공공기관 200여 곳 모두를 지방으로 이전해 혁신도시를 완성하겠다."',//lee
            qa_3:'수도권에 남아있을 필요가 없는 공공기관은 모두 비수도권으로 이전하겠다는 것이 제1원칙 아래 1차 이전과 달리 신도시 개발방식을 지양하고 원도심의 인프라를 활용하는 도시재생방식을 적극 추진하겠다',//shim
            qa_4:'지역과 시너지를 내는 접근이 아닌 공공기관의 기계적 이전에는 반대한다. 지방에 필요한 것은 공공기관 이전보다 기업의 이전을 통한 시너지 창출과 경제발전이다',//ahn
        },
        {
            id:10,
            qa:"지역 발전론",
            qa_1:'중앙정부가 지방정부와 협업하여 청년들이 도약할 수 있는 청년베이스캠프를 만들어 청년지원서비스를 원스톱으로 제공하고자 한다.',//yoon
            qa_2:'지방으로 이전하는 수도권 또는 국내복귀 기업에 규제특례, 조세혜택 제공하여 촉진하고, 국가미래전략산업 중심의 ‘K-혁신밸리’를 지역에 배치해 혁신형 지역 일자리를 마련하겠다.',//lee
            qa_3:'공공기관 300여개와 국회 등 헌법기관의 지방 이전을 강력하게 추진하겠습니다. 둘째, 기업의 지방 이전과 지방 창업을 독려하기 위해 강력한 인센티브를 제공하겠습니다',//shim
            qa_4:'지방정부의 재정 확대를 위해 부가세·소득세·법인세 등 기존의 국세를 중앙정부와 지방정부가 공유해서 나누는 ‘차등 공동세’ 도입을 적극 추진하겠다.',//ahn
        },
    ]
    const selectLogic = (e)=>{
        const {name} = e.target;
        if(counting[`qa_${pageNum}`].result!==name){
            setCounting({
                ...counting,
                [`qa_${pageNum}`]:{
                    result:name
                } 
            })
        }else if(counting[`qa_${pageNum}`].result===name){

        }else{
            setCounting({
                ...counting,
                [`qa_${pageNum}`]:{
                    result:name
                } 
            })      
        }
    }

    const nextLogic=()=>{
        if(counting[`qa_${pageNum}`].result!==""){
            nextQuestion();
        }else{
            setModalState(true);
            setTimeout(() => {
                setModalState(false);
            }, 1000);
        }
    }

    useEffect(()=>{
        if(counting[`qa_${pageNum}`].result!==""){
            setCounting({
                ...counting,
                [`qa_${pageNum}`]:{
                    result:counting[`qa_${pageNum}`].result
                } 
            })
        }
    },[pageNum])
    return (
        <QaPage>
            <QaBox>
                <div className="qaGage">
                    <QaGageItem state={pageNum>=1}/>
                    <QaGageItem state={pageNum>=2}/>
                    <QaGageItem state={pageNum>=3}/>
                    <QaGageItem state={pageNum>=4}/>
                    <QaGageItem state={pageNum>=5}/>
                    <QaGageItem state={pageNum>=6}/>
                    <QaGageItem state={pageNum>=7}/>
                    <QaGageItem state={pageNum>=8}/>
                    <QaGageItem state={pageNum>=9}/>
                    <QaGageItem state={pageNum>=10}/>
                </div>
                <h2>Question {pageNum}</h2>
                <div className="qa">{qusestionList[pageNum-1].qa}</div>
            </QaBox>
            <ChoiceBox>
                <button name="yoon" 
                    style={{
                        backgroundColor:counting[`qa_${pageNum}`].result==="yoon"&&"#5704E2",
                        color:counting[`qa_${pageNum}`].result==="yoon"&&"#fff"}}  
                        onClick={selectLogic}>{qusestionList[pageNum-1].qa_1}</button>
                <button name="lee"  
                    style={{
                        backgroundColor:counting[`qa_${pageNum}`].result==="lee"&&"#5704E2",
                        color:counting[`qa_${pageNum}`].result==="lee"&&"#fff"}}  
                        onClick={selectLogic}>{qusestionList[pageNum-1].qa_2}</button>
                <button name="shim" 
                    style={{
                        backgroundColor:counting[`qa_${pageNum}`].result==="shim"&&"#5704E2",
                        color:counting[`qa_${pageNum}`].result==="shim"&&"#fff"}}     
                        onClick={selectLogic}>{qusestionList[pageNum-1].qa_3}</button>
                <button name="ahn"  
                    style={{
                        backgroundColor:counting[`qa_${pageNum}`].result==="ahn"&&"#5704E2",
                        color:counting[`qa_${pageNum}`].result==="ahn"&&"#fff"}}     
                        onClick={selectLogic}>{qusestionList[pageNum-1].qa_4}</button>
            </ChoiceBox>
            <BtnList>
                <Btn onClick={preQuestion}>이전으로</Btn>
                <Btn onClick={nextLogic} state={counting[`qa_${pageNum}`].result!==""}>다음으로</Btn>
            </BtnList>
            {modalState&&<ModalWindow>보기를 선택해주세요!</ModalWindow>}
        </QaPage>
    );
}

export default Question;    