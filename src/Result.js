import React, { useEffect, useState } from 'react';
import styled,{css}from 'styled-components';
import result_bg from './img/result_bg.svg';

const ResultPage = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:100%;
    height:100%;
    overflow-y:scroll;
    background-color:#f7f7f7;
    color:#000;

    h1{
        font-size:1.25rem;
        font-weight:400;
        z-index:9;
    }

    h2{
        margin-top:23px;
        margin-bottom:38px;
        font-size:3.5rem;
        z-index:9;
    }

    .selectTitle{
            padding-bottom:8px;
            color:#000;
    }
    a{
        z-index:999;
        margin-bottom:10px;
    }
`;

const ResultBg = styled.div`
    position:absolute;
    width:100%;
    max-width:480px;
    transform:translateX(-50%);
    left:50%;
    height:133px;
    background:url(${result_bg});
    bottom:0px;
    ${props=>props.up&&css`
        top:0px;  
    `}
`;

const BtnBox = styled.div`
    display:flex;
    width:100%;
    justify-content:center;
    margin-bottom:30px;
    z-index:9;
    
`

const Btn = styled.button`
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:#A586D9;
    padding:1rem 1rem;
    border:none;
    width:130px;
    height:36px;
    color:#fff;
    border-radius:4px;
    font-size:1rem;
    &+&{
        margin-left:8px;
    }
    ${props=>props.state&&css`
        background-color:#5704E2;
    `
    }
`;

const ChoiceBox = styled.div`
        display:flex;
        flex-direction:column;
        align-items:center;
        width:100%;
        margin-bottom:1rem;
        overflow-y:scroll;
        background-color:#f7f7f7;
        color:#fff;

    z-index:9;
        .select_item{
            background-color:transparent;
            width:90%;
            padding:1rem 1rem;
            border:none;
            border-radius:8px;
            color:#000;
            font-size:0.7rem;
            text-align:left;
            line-height:1.3;
            background-color:#fff;
            margin-top:8px;
            box-shadow:0px 4px 4px rgba(0, 0, 0, 0.05);
            &+&{
                margin-top:8px;
            }
        }

        .select_item_link{
            margin-top:8px;
            font-style:italic;
        }
`

const SelectListRender=({item,yourChoise})=>{
    return(
        <div className="select_item">
            <div dangerouslySetInnerHTML={{__html:item[yourChoise].text}}></div>
            <div className="select_item_link">{item[yourChoise].link}</div>
        </div>
    )
}


function Result ({counting,resetBtn}) {
    const [yourChoise,setYourChoise] = useState("");
    const [selectArray,setSelectArray] = useState([]);
    const [href,setHref] = useState("");
    const qusestionList=[
        {
            id:1,
            qa:`새 정부의 스타트업 육성 정책 방향은?`,
            yoon:{
                text:`기술혁명 시대에는 정부가 나서서 산업을 육성시킨다는 것보단 <u>민간 분야에서 자율적인 기업 활동을 할 수 있도록 정부는 여건을 만들어줘야 한다.</u>`,//yoon
                link:"(윤석열, 21년7월8일, 팁스타운 간담회)"
            },
            lee:{
                text:'스타트업이 자유롭게 창의와 혁신을 실천하도록 기회를 주려면 <u>정부의 적극적인 책임 이행이 필요하다.</u>',//lee
                link:"(이재명, 21년11월8일, 스타트업 정책 토크)"
            },
            shim:{
                text:"‘그린노믹스’ 아래 우리 경제의 시스템과 철학을 완전히 바꾸고 <u>기술과 노동, 시장과 사회, 인간과 지구가 공존하는 ‘신질서’를 수립</u>하겠다.",
                link:"(심상정, 22년 2월 7일, ‘그린노믹스 , 공존과 번영의 신경제)"
            },//shim
            ahn:{
                text:'<u>특별법적 지위를 가진 전담부서와 함께</u> 우선적이고 파격적인 규제혁신을 이뤄내겠다.',
                link:"(안철수, 22년2월4일, 중기중앙회)"
            }//ahn
        },
        {
            id:2,
            qa:"어떻게 기업과 스타트업을 규제해야 할까?",
            yoon:{
                text:'강한 국가라는 것은 대기업 뿐 아니라 강한 기업, 강소기업을 얼마나 보유하는냐가 중요하기 때문에 <u>정치가 자유로운 기업 활동을 방해하지 않아야 한다</u>고 생각한다.',//yoon
                link:"(윤석열, 21년7월8일, 스타트업 대표 간담회)"
            },
            lee:{
                text:'과도한 규제, 일종의 진입장벽이 창업 성장을 훼손하고 있다. <u>금지된 것 이외에는 자유롭게 활동할 수 있는 산업 환경을 만들어내야 한다.</u>',//lee
                link:"(이재명, 21년11월8일, 스타트업 정책토크)"
            },
            shim:{
                text:"디지털플랫폼기업 독점방지법을 통해 플랫폼경제 민주화를 이루겠다. <u>디지털은행에도 금산분리원칙을 강화하고 플랫폼기업들의 개인정보 남용을 막아 시민의 정보권을 지키겠다.</u>",
                link:"(심상정, 22년 2월 7일, ‘플랫폼경제 민주화 공약)"
            },//shim
            ahn:{
                text:'<u>인간의 생명과 안전에 대한 규제는</u> 촘촘하게 강화하고, <u>신산업에 대한 규제는</u> 몇 가지 하면 안 되는 것만 지정하고 나머지는 <u>네거티브 규제로 바꿔야한다.</u>',
                link:"(안철수, 22년1월19일, 카이스트 과학정책 대화 )"
            }//ahn
        },
        {
            id:3,
            qa:"우리 사회가 추구해야할 '공정성'이란 무엇일까?",
            yoon:{
                text:'작은 기업부터 대기업으로 <u>성장하고 가치를 창출해낼 기회가 제대로 부여되는 사회</u>가 공정한 사회.',//yoon
                link:"(윤석열, 21년7월8일, 팁스타운 간담회)"
            },
            lee:{
                text:'<u>대기업과 중소기업, 자본과 노동이 상생·협력하는 공정한 성장</u>이 저성장의 늪에서 벗어날 해법.',//lee
                link:"(이재명, 21년12월8일, 중소벤처기업 정책공약)"
            },
            shim:{
                text:"‘청년기초자산제’ ‘비정규직 평등수당’ ‘최소노동시간 보장제’ ‘공공기관 청년고용의 무할당제’ 확대로 <u>기울어진 운동장을 바로잡기 위해 노력하겠다.</u>",
                link:"(심상정, 22년 2월 11일, 더스쿠프-한국사회공헌협회 공동기획)"
            },//shim
            ahn:{
                text:'<u>강성 귀족노조가 자신들의 기득권 유지를 위해, 청년들의 꿈을 짓밟고 노동시장을 왜곡시키지 못하도록</u> 모든 수단을 강구할 것.',
                link:"(안철수, 22년 1월 26일, 페이스북 세번째 민노총 혁파 정책)"
            }//ahn
        },
        {
            id:4,
            qa:"청년 창업 활성화를 위해 새 정부는 무엇을 해야할까?",
            yoon:{
                text:'20~30대를 위해 <u>대학을 창업 기지화하여</u> 학생수 감소에 따른 여유 인프라를 대학창업기지로 전환해 <u>창업가를 양성하겠다.</u>',//yoon
                link:"(윤석열, 21년12월26일, 상식회복을 위한 성장과 복지의 선순환 공약)"
            },
            lee:{
                text:'벤처 기업 선배들과 정부가 1조원 규모의 <u>창업연대기금을 만들어서</u> 실패해도 재기할 수 있는 <u>안전망을 만들겠다.</u>',//lee
                link:"(이재명, 21년12월8일, 중소벤처기업 정책공약)"
            },
            shim:{
                text:"직업교육 마스터플랜을 마련하고, 산학연계 일자리 창출 방안과 <u>지역연계 선순환 창업지원 방안을 종합적으로 마련하겠다.</u>",
                link:"(심상정, 21년 12월 13일, ‘위기의 대학, 공유경제를 만나다에서)"
            },//shim
            ahn:{
                text:"각 시도에 특수목적고를 세우고 <u>평생교육체계 구축</u>, 중기와 대기업이 함께 어울리는 <u>산업거점도 확대하며</u>, 구글 캠퍼스 같은 미래 혁신 인재들이 자유롭게 창업하는 <u>창업혁신캠퍼스 조성하겠다.</u>",
                link:"(안철수, 22년2월4일, 중기중앙회)"
            }//ahn
        },
        {
            id:5,
            qa:"창업 인프라를 구축해야 할까?",
            yoon:{
                text:'<u>벤처기업 스톡옵션 비과세 한도를 현행 3천만원에서 2억원으로 높이는 등 각종 유인책</u>을 확대하겠다.',//yoon
                link:"(윤석열, 21년12월26일, 상식회복을 위한 성장과 복지의 선순환 공약)"
            },
            lee:{
                text:'2027년까지 정부의 <u>벤처투자 예산을 10조 원으로 확대</u>하고 연 30만 곳의 신기술·신산업 창업을 유도하겠다.',//lee
                link:"(이재명, 21년12월8일, 중소벤처기업 정책공약)"
            },
            shim:{
                text:"<u>기업의 지방 이전과 지방 창업을 독려하기 위해 강력한 인센티브</u>를 제공하겠다.",
                link:"(심상정, 22년 2월 11일, 더스쿠프-한국사회공헌협회 공동기획)"
            },//shim
            ahn:{
                text:'금융기관에서 5년간 ‘중소·벤처 성장지원’에 매년 10조씩 <u>5년간 총 50조원의 모험자본을 공급</u>하고 여기에 정부가 특별보증 등으로 매년 1조원을 지원하겠다.',
                link:"(안철수, 22년2월4일, 중기중앙회)"
            }//ahn
        },
        {
            id:6,
            qa:"어떻게 하면 일자리를 창출할 수 있을까?",
            yoon:{
                text:'일자리야 말로 최고의 복지, <u>신산업 생태계 조성, 세대별 맞춤형, 중소・중견기업의 신산업 금융 지원 및 투자 세액공제 확대</u>하겠다.',//yoon
                link:"(윤석열, 21년12월28일, 주한미국상공회의소 간담회)"
            },
            lee:{
                text:"기업이 늘어나고 성장해야 일자리도 많아진다,<u>기업 주도의 일자리 성장을 촉진하고 강력한 일자리 환류정책<u>을 추진하겠다.",//lee
                link:"(이재명, 22년1월18일, 일자리 대전환 6대 공약)"
            },
            shim:{
                text:"‘원하는 모든 청년에게 생활임금과 사회보험, 이직 준비와 교육을 제공하는 일자리를 국가가 제공하는 <u>'국가 일자리보장제'를 제안한다.</u>",
                link:"(심상정, 22년2월21일, 한겨레 지역균형 공약질의서)"
            },//shim
            ahn:{
                text:'디스플레이, 이차전지, 차세대원전, 수소에너지, 바이오산업 등 초격차 과학 기술 5개 확보해 <u>삼성전자 급의 선도기업을 육성해 일자리를 창출하겠다.</u>',
                link:"(안철수, 22년2월13일, 555 신성장전략 공약)"
            }//ahn
        },
        {
            id:7,
            qa:"52시간・주5일제 이슈, 어떻게 풀어야할까?",
            yoon:{
                text:'주 52시간제도 주 단위만 고집할 것이 아니라 <u>3개월 단위, 6개월 단위 등으로 탄력적으로 운영해서 기업과 근로자가 처한 현실을 잘 반영해야 한다고 생각한다.</u>',//yoon
                link:"(윤석열, 21년12월2일, 페이스북)"
            },
            lee:{
                text:'우리 국민은 경제협력개발기구 평균보다 훨씬 더 많이 일하고 있다,<u>주 4.5일제 도입을 위한 사회적 대화를 시작하고 단계적 도입을 위한 시범사업을 추진하겠다.</u>',//lee
                link:"(이재명, 22년1월26일, 노동 공약)"
            },
            shim:{
                text:"‘시간빈곤’으로 인한 여가·휴식시간 부족은 생산성 저하뿐만 아니라 또다른 불평등을 야기하고 있습니다. <u>주4일제를 도입해 시간빈곤 대한민국을 극복할 때입니다.</u>",
                link:"(심상정, 22년 2월 11일, 더스쿠프-한국사회공헌협회 공동기획)"
            },//shim
            ahn:{
                text:'주52시간제도 지금 너무 경직돼 있다. <u>주52시간제에 대해서는 유연성을 가질 수 있게 해야 한다.</u>업종별 예외도 허용해야 되지 않는가 생각한다.',
                link:"(안철수, 22년2월4일, 중소기업 미래비전 프로젝트행사에서)"
            }//ahn
        },
        {
            id:8,
            qa:"저성장 시대를 어떻게 극복할 수 있을까?",
            yoon:{
                text:'4차 산업혁명은 판 기술, 첨단 기술의 개발과 상용화뿐 아니라 <u>기존 산업의 기술적 업그레이드와 생산성 향상 그리고 생산 형태의 변화를 가져온다.</u>',//yoon
                link:"(윤석열, 22년2월7일, 상공회의소 초청강연)"
            },
            lee:{
                text:'<u>저성장을 전제로 모든 정책을 수립하는 것</u>을 넘어 성장을 회복해야 한다. 성장을 회복하면 기회가 늘어나고. 기회가 늘어나면 경쟁이 완화된다.',//lee
                link:"(이재명, 21년8월22일, 크로스캠퍼스 간담회)"
            },
            shim:{
                text:'태양광과 풍력·첨단 배터리·전기차 기술·그린수소·생태농어업 등 <u>5대 녹색기술혁신과 녹색산업혁명 시대를 열어 국가 신성장 동력을 마련하겠다.</u>',
                link:"(심상정, 22년2월10일, 대선후보 초청 과학기술 정책토론회)"
            },//shim
            ahn:{
                text:'한국이 전 세계적으로 강점을 보이는 분야가 어딘지 살펴본 뒤 <u>초격차를 나타내는 분야에 집중적으로 투자해야 한다.</u>',
                link:"(안철수, 22년2월7일, G3 디지털경제 강국 도약을 위한 정책간담회)"
            }//ahn
        },
        {
            id:9,
            qa:"ESG 트렌드, 어떻게 대처해야 할까?",
            yoon:{
                text:'모든 중소기업에 ESG를 요구한다는 건 대단히 어렵다. <u>ESG 투자에 대한 반대급부로 얻는 것이 많다고 느낄 만한 제도적 여건은 만들어가겠다.</u>',//yoon
                link:"(윤석열, 22년2월7일, 상공회의소 초청강연)"
            },
            lee:{
                text:'ESG는 자본시장 선진화의 한 방법이라고 생각한다. ESG 경영 지표를 세부적으로 만들어 기준에 부합할 경우 <u>연기금 투자에 우선권을 주는 등의 혜택이 필요하다</u>고 생각한다.',//lee
                link:"(이재명, 21년11월4일, 주식시장 발전과 개인투자자 보호를 위한 간담회')"
            },
            shim:{
                text:"<u>ESG경영의 제1 실천과제는 안전</u>이다. '기업하다 보면 사람 죽을 수도 있지'라는 생각을 과감하게 단절해야 한다.",
                link:"(심상정, 22년1월19일, 대한상공회의소 간담회)"
            },//shim
            ahn:{
                text:'산업의 경쟁력을 유지하면서 <u>새로운 기술 개발을 통해 탄소중립의 길로 가는 지혜를 찾아야 한다.</u>',
                link:"(안철수, 22년2월15일, 환경일보 인터뷰)"
            }//ahn
        },
        {
            id:10,
            qa:"새정부가 추구해야할 IT정책 방향성은?",
            yoon:{
                text:"우리 정부를 디지털 기술과 빅데이터에 기반한 국민 맞춤형 서비스 정부인 <u>'디지털 플랫폼 정부'로 바꾸고자한다.</u>",//yoon
                link:"(윤석열, 22년1월2일, 디지털플랫폼 정부 공약)"
            },
            lee:{
                text:'<u>데이터의 수집·축적·전달을 위한 3대 인프라인 사물인터넷(IoT), 클라우드, 5G와 6G 등을 구축</u>하고 이들을 밀접하게 연결하겠다.',//lee
                link:"(이재명, 21년11월26일, 디지털 전환 성장 공약)"
            },
            shim:{
                text:"취약한 기초연구의 토대, 지역 간 불균형한 과학기술 인프라는 여전히 우리의 발목을 잡는 고질병이다. <u>태양광과 풍력 등 5대 녹색기술혁신과 녹색산업혁명 시대를 열겠다.</u>",
                link:"(심상정, 22년2월10일, 과학기술 공약)"
            },//shim
            ahn:{
                text:'<u>과학기술부총리직을 신설하고 대통령 직속으로 국가미래전략위원회를 설치</u>해 과학경제 강국을 준비하겠다.”',
                link:"(안철수, 22년2월13일, 555 신성장전략 공약)"
            }//ahn
        },
    ]

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
        switch(countingLogic(counting)){
            case "yoon":
                setHref("http://www.sbiz.news/news/articleView.html?idxno=21156");
                break;
            case "lee":
                setHref("http://www.sbiz.news/news/articleView.html?idxno=21153");
                break;            
            case "shim":
                setHref("http://www.sbiz.news/news/articleView.html?idxno=21151");
                break;            
            case "ahn":
                setHref("http://www.sbiz.news/news/articleView.html?idxno=21150");
                break;
            default:
                break;
        }
        let selectarray=[];
        for(let i=1;i<=10;i++){
            if(counting[`qa_${i}`].result===countingLogic(counting)){
                selectarray.push(qusestionList[i-1]);
            }
        }
        setSelectArray(selectarray);
    },[])
    console.log(selectArray);
    return (
        <ResultPage>
            <h1>당신의 선택은</h1>
            {yourChoise==="yoon"&&<h2>윤석열</h2>}
            {yourChoise==="lee"&&<h2>이재명</h2>}
            {yourChoise==="shim"&&<h2>심상정</h2>}
            {yourChoise==="ahn"&&<h2>안철수</h2>}
            <div className="selectTitle">선택한 대선후보의 말</div>
            <ChoiceBox>
                {selectArray.map((item)=>(<SelectListRender item={item} yourChoise={yourChoise}/>))}
            </ChoiceBox>
            <a href={href}>
                {yourChoise==="yoon"&&"윤석열 국민의힘 "}
                {yourChoise==="lee"&&"이재명 더불어민주당 "}
                {yourChoise==="shim"&&"심상정 정의당 "}
                {yourChoise==="ahn"&&"안철수 국민의당 "}
                대선후보 공약 분석 기사 바로가기
            </a>
            <BtnBox>
                <Btn onClick={resetBtn} state>다시하기</Btn>
                <Btn onClick={clip}>공유하기</Btn>
            </BtnBox>
            <ResultBg up/>
            <ResultBg/>
        </ResultPage>
    );
}

export default Result;    