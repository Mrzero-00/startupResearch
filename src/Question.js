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
            word-break: break-all;
            width:90%;
            text-align:center;
            font-size:1rem;
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
    animation-duration : 1500ms;
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
        padding-bottom:1rem;
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
            qa:`스타트업과 기업 정책 새정부는 어떤 방향을 가야 할까요?`,
            yoon:{
                text:'기술혁명 시대에는 정부가 나서서 산업을 육성시킨다는 것보단 민간 분야에서 자율적인 기업 활동을 할 수 있도록 정부는 여건을 만들어줘야 한다',//yoon
                link:"(윤석열, 21년7월8일, 팁스타운 간담회)"
            },
            lee:{
                text:'스타트업이 자유롭게 창의와 혁신을 실천하도록 기회를 주려면 정부의 적극적인 책임 이행이 필요하다',//lee
                link:"(이재명, 21년11월8일, 스타트업 정책 토크)"
            },
            shim:{
                text:"‘그린노믹스’ 아래 우리 경제의 시스템과 철학을 완전히 바꾸고 기술과 노동, 시장과 사회, 인간과 지구가 공존하는 ‘신질서’를 수립하겠다",
                link:"(심상정, 22년 2월 7일, ‘그린노믹스 , 공존과 번영의 신경제)"
            },//shim
            ahn:{
                text:'많은 기업들이 정부 규제로 답답해한다. 혁신 속도를 따라오지 못해 중기와 스타트업들이 퀀텀점프 못하는 경우가 많다" "특별법적 지위를 가진 전담부서와 함께 우선적이고 파격적인 규제혁신을 이뤄내겠다',
                link:"(안철수, 22년2월4일, 중기중앙회)"
            }//ahn
        },
        {
            id:2,
            qa:"말 많고 탈 많은 규제 어떻게 생각하시나요?",
            yoon:{
                text:'강한 국가라는 것은 대기업 뿐 아니라 강한 기업, 강소기업을 얼마나 보유하는냐가 중요하기 때문에 정치가 자유로운 기업 활동을 방해하지 않아야 한다고 생각한다',//yoon
                link:"(윤석열, 21년7월8일, 스타트업 대표 간담회)"
            },
            lee:{
                text:'과도한 규제, 일종의 진입장벽이 창업 성장을 훼손하고 있다. 금지된 것 이외에는 자유롭게 활동할 수 있는 산업 환경을 만들어내야 한다',//lee
                link:"(이재명, 21년11월8일, 스타트업 정책토크)"
            },
            shim:{
                text:"디지털플랫폼기업 독점방지법을 통해 플랫폼경제 민주화를 이루겠다. 디지털은행에도 금산분리원칙을 강화하고 플랫폼기업들의 개인정보 남용을 막아 시민의 정보권을 지키겠다",
                link:"(심상정, 22년 2월 7일, ‘플랫폼경제 민주화 공약)"
            },//shim
            ahn:{
                text:'인간의 생명과 안전에 대한 규제는 오히려 촘촘하게 강화하고, 신산업에 대한 규제는 몇 가지 하면 안 되는 것만 지정하고 나머지는 다 해도 괜찮은 네거티브 규제로 바꿔야한다',
                link:"(안철수, 22년1월19일, 카이스트 과학정책 대화 )"
            }//ahn
        },
        {
            id:3,
            qa:"공정한 사회 새 정부는 어떻게 세울 수 있을까요?",
            yoon:{
                text:'작은 기업부터 대기업으로 성장하고 가치를 창출해낼 기회가 제대로 부여되는 사회가 공정한 사회',//yoon
                link:"(윤석열, 21년7월8일, 팁스타운 간담회)"
            },
            lee:{
                text:'대기업과 중소기업, 자본과 노동이 상생·협력하는 공정한 성장이 저성장의 늪에서 벗어날 해법',//lee
                link:"(이재명, 21년12월8일, 중소벤처기업 정책공약)"
            },
            shim:{
                text:"‘청년기초자산제’ ‘비정규직 평등수당’ ‘최소노동시간 보장제’ ‘공공기관 청년고용의 무할당제’ 확대로 기울어진 운동장을 바로잡기 위해 노력하겠다.",
                link:"(심상정, 22년 2월 11일, 더스쿠프-한국사회공헌협회 공동기획)"
            },//shim
            ahn:{
                text:'강성 귀족노조가 자신들의 기득권 유지를 위해, 청년들의 꿈을 짓밟고 노동시장을 왜곡시키지 못하도록 모든 수단을 강구할 것',
                link:"(안철수, 22년 1월 26일, 페이스북 세번째 민노총 혁파 정책)"
            }//ahn
        },
        {
            id:4,
            qa:"청년 취창업 새 정부는 무엇을 해야 할까요?",
            yoon:{
                text:'20~30대를 위해 대학을 창업 기지화하여 학생수 감소에 따른 여유 인프라를 대학창업기지로 전환해 창업가를 양성하겠다',//yoon
                link:"(윤석열, 21년12월26일, 상식회복을 위한 성장과 복지의 선순환 공약)"
            },
            lee:{
                text:'벤처 기업 선배들과 정부가 1조원 규모의 창업연대기금을 만들어서 실패해도 재기할 수 있는 안전망을 만들겠다',//lee
                link:"(이재명, 21년12월8일, 중소벤처기업 정책공약)"
            },
            shim:{
                text:"직업교육 마스터플랜을 마련하고, 산학연계 일자리 창출 방안과 지역연계 선순환 창업지원 방안을 종합적으로 마련할 것입니다. 졸업생 중심으로 청년 벤처기업들이 사무공간을 대학 내에 유치",
                link:"(심상정, 21년 12월 13일, ‘위기의 대학, 공유경제를 만나다에서)"
            },//shim
            ahn:{
                text:'“혁신기반 기업 성장을 위한 미래기술 핵심 인재를 5년간 20만명 양성하겠다” “각 시도에 특수목적고를 세우고 평생교육체계 구축, 중기와 대기업이 함께 어울리는 산업거점도 확대하며, 구글 캠퍼스 같은 미래 혁신 인재들이 자유롭게 창업하는 창업혁신캠퍼스 조성하겠다”',
                link:"(안철수, 22년2월4일, 중기중앙회)"
            }//ahn
        },
        {
            id:5,
            qa:"창업 인프라 어떻게 쌓아야 할까요?",
            yoon:{
                text:'벤처기업 스톡옵션 비과세 한도를 현행 3천만원에서 2억원으로 높이는 등 각종 유인책을 확대하겠다',//yoon
                link:"(윤석열, 21년12월26일, 상식회복을 위한 성장과 복지의 선순환 공약)"
            },
            lee:{
                text:'2027년까지 정부의 벤처투자 예산을 10조 원으로 확대하고 연 30만 곳의 신기술·신산업 창업을 유도하겠다',//lee
                link:"(이재명, 21년12월8일, 중소벤처기업 정책공약)"
            },
            shim:{
                text:"공공기관 300여개와 국회 등 헌법기관의 지방 이전을 강력하게 추진하겠다. 기업의 지방 이전과 지방 창업을 독려하기 위해 강력한 인센티브를 제공하겠다",
                link:"(심상정, 22년 2월 11일, 더스쿠프-한국사회공헌협회 공동기획)"
            },//shim
            ahn:{
                text:'금융기관에서 5년간 ‘중소·벤처 성장지원’에 매년 10조씩 5년간 총 50조원의 모험자본을 공급하고 여기에 정부가 특별보증 등으로 매년 1조원을 지원하겠다',
                link:"(안철수, 22년2월4일, 중기중앙회)"
            }//ahn
        },
        {
            id:6,
            qa:"무엇보다 일자리 방법은 무엇일까요?",
            yoon:{
                text:'국민행복시대는 일자리에서 시작하고, 일자리야 말로 최고의 복지',//yoon
                link:"(윤석열, 21년12월28일, 주한미국상공회의소 간담회)"
            },
            lee:{
                text:'"기업이 늘어나고 성장해야 일자리도 많아진다" “기업 주도의 일자리 성장을 촉진하고 강력한 일자리 환류정책을 추진하겠다”',//lee
                link:"(이재명, 22년1월18일, 일자리 대전환 6대 공약)"
            },
            shim:{
                text:"‘국가 일자리보장제’를 제안한다. 일자리보장제는 원하는 모든 청년에게 생활임금과 사회보험, 이직 준비와 교육을 제공하는 일자리를 국가가 제공하는 제도이다.",
                link:"(심상정, 22년2월21일, 한겨레 지역균형 공약질의서)"
            },//shim
            ahn:{
                text:'청년이 힘든 근본적인 원인은, 공무원과 공공일자리만 늘리면서 일자리 상황이 좋아졌다고 자화자찬하는 문재인 정부의 고용정책 실패 때문',
                link:"(안철수, 22년1월26일, 페이스북)"
            }//ahn
        },
        {
            id:7,
            qa:"일과 삶 그 균형은 어디일까요?",
            yoon:{
                text:'주 52시간제도 주 단위만 고집할 것이 아니라 3개월 단위, 6개월 단위 등으로 탄력적으로 운영해서 기업과 근로자가 처한 현실을 잘 반영해야 한다고 생각한다',//yoon
                link:"(윤석열, 21년12월2일, 페이스북)"
            },
            lee:{
                text:'"우리나라 노동시간이 주 최대 52시간으로 줄었지만 우리 국민은 경제협력개발기구 평균보다 훨씬 더 많이 일하고 있다" "주 4.5일제 도입을 위한 사회적 대화를 시작하고 단계적 도입을 위한 시범사업을 추진하겠다”',//lee
                link:"(이재명, 22년1월26일, 노동 공약)"
            },
            shim:{
                text:"‘시간빈곤’으로 인한 여가·휴식시간 부족은 생산성 저하뿐만 아니라 또다른 불평등을 야기하고 있습니다. 주4일제를 도입해 시간빈곤 대한민국을 극복할 때입니다.",
                link:"(심상정, 22년 2월 11일, 더스쿠프-한국사회공헌협회 공동기획)"
            },//shim
            ahn:{
                text:'“주52시간제도 지금 너무 경직돼 있다” “주52시간제에 대해서는 유연성을 가질 수 있게 해야 한다” “업종별 예외도 허용해야 되지 않는가 생각한다”',
                link:"(안철수, 22년2월4일, 중소기업 미래비전 프로젝트행사에서)"
            }//ahn
        },
        {
            id:8,
            qa:"뉴노멀 시대의 성장의 방법은 무엇일까요?",
            yoon:{
                text:'“역동적 혁신 성장은 생산적 맞춤 복지를 실현하는 길이며 성장과 복지의 지속가능한 선순환을 이루는 것” “4차 산업혁명은 판 기술, 첨단 기술의 개발과 상용화뿐 아니라 기존 산업의 기술적 업그레이드와 생산성 향상 그리고 생산 형태의 변화를 가져온다” ',//yoon
                link:"(윤석열, 22년2월7일, 상공회의소 초청강연)"
            },
            lee:{
                text:'"저성장을 전제로 모든 정책을 수립하는 것을 넘어 성장을 회복해야 한다","성장을 회복하면 기회가 늘어나고. 기회가 늘어나면 경쟁이 완화된다”',//lee
                link:"(이재명, 21년8월22일, 크로스캠퍼스 간담회)"
            },
            shim:{
                text:'"5대 녹색기술혁신과 녹색산업혁명 시대를 열어 국가 신성장 동력을 마련하겠다” “5대 녹색기술혁신은 태양광과 풍력 핵심기술·첨단 배터리기술혁신·선도적인 전기차 기술·그린수소 기술혁신·생태농어업 기술혁신이다.”',
                link:"(심상정, 22년2월10일, 대선후보 초청 과학기술 정책토론회)"
            },//shim
            ahn:{
                text:'“1~2등 사이 격차가 낮으면 언제든 추월할 수 있지만, 초격차를 유지하면 절대적인 선두 자리를 이어갈 수 있다” “한국이 전 세계적으로 강점을 보이는 분야가 어딘지 살펴본 뒤 초격차를 나타내는 분야에 집중적으로 투자해야 한다”',
                link:"(안철수, 22년2월7일, G3 디지털경제 강국 도약을 위한 정책간담회)"
            }//ahn
        },
        {
            id:9,
            qa:"ESG 무엇이 옳은 길일까요?",
            yoon:{
                text:'“모든 중소기업에 ESG를 요구한다는 건 대단히 어렵다” “ESG 투자에 대한 반대급부로 얻는 것이 많다고 느낄 만한 제도적 여건은 만들어가겠다”',//yoon
                link:"(윤석열, 22년2월7일, 상공회의소 초청강연)"
            },
            lee:{
                text:'"ESG 경영 지표를 세부적으로 만들어 기준에 부합할 경우 연기금 투자에 우선권을 주는 등의 혜택이 필요하다고 생각한다” "자본시장 선진화의 한 방법이라고 생각한다"',//lee
                link:"(이재명, 21년11월4일, 주식시장 발전과 개인투자자 보호를 위한 간담회')"
            },
            shim:{
                text:"“ESG경영의 제1 실천과제는 안전” “경제협력개발기구회원국인 우리나라가 이제 산재 왕국이라는 오명을 떨칠 때가 됐다. ‘기업하다 보면 사람 죽을 수도 있지’라는 생각을 과감하게 단절해야 한다”",
                link:"(심상정, 22년1월19일, 대한상공회의소 간담회)"
            },//shim
            ahn:{
                text:'사회적 합의를 배제한 채 국가온실가스감축목표를 2018년 대비 26.3%에서 40%로 올린 점이 바람직하지 않다. 산업의 경쟁력을 유지하면서 새로운 기술 개발을 통해 탄소중립의 길로 가는 지혜를 찾아야 한다.',
                link:"(안철수, 22년2월15일, 환경일보 인터뷰)"
            }//ahn
        },
        {
            id:10,
            qa:"디지털 시대 새정부의 IT정책 방향은 어디일까요?",
            yoon:{
                text:'“우리 정부를 ‘디지털 플랫폼 정부’로 바꾸고자 한다” “디지털 기술과 빅데이터에 기반한 국민 맞춤형 서비스 정부”',//yoon
                link:"(윤석열, 22년1월2일, 디지털플랫폼 정부 공약)"
            },
            lee:{
                text:'데이터의 수집·축적·전달을 위한 3대 인프라인 사물인터넷(IoT), 클라우드, 5G와 6G 등을 구축하고 이들을 밀접하게 연결하겠다',//lee
                link:"(이재명, 21년11월26일, 디지털 전환 성장 공약)"
            },
            shim:{
                text:"“취약한 기초연구의 토대, 지역 간 불균형한 과학기술 인프라는 여전히 우리의 발목을 잡는 고질병” “태양광과 풍력 등 5대 녹색기술혁신과 녹색산업혁명 시대를 열겠다”",
                link:"(심상정, 22년2월10일, 과학기술 공약)"
            },//shim
            ahn:{
                text:'“5대 초격차기술 육성해 삼성전자급 글로벌 대기업 5개를 만들어 세계 5대 경제강국으로 진입” “이를 위해 ‘과학기술부총리’직을 신설하고 대통령 직속으로 국가미래전략위원회를 설치해 과학경제 강국을 준비할 것”',
                link:"(안철수, 22년2월13일, 555 신성장전략 공약)"
            }//ahn
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
            }, 1500);
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
                        onClick={selectLogic}>{qusestionList[pageNum-1].yoon.text}</button>
                <button name="lee"  
                    style={{
                        backgroundColor:counting[`qa_${pageNum}`].result==="lee"&&"#5704E2",
                        color:counting[`qa_${pageNum}`].result==="lee"&&"#fff"}}  
                        onClick={selectLogic}>{qusestionList[pageNum-1].lee.text}</button>
                <button name="shim" 
                    style={{
                        backgroundColor:counting[`qa_${pageNum}`].result==="shim"&&"#5704E2",
                        color:counting[`qa_${pageNum}`].result==="shim"&&"#fff"}}     
                        onClick={selectLogic}>{qusestionList[pageNum-1].shim.text}</button>
                <button name="ahn"  
                    style={{
                        backgroundColor:counting[`qa_${pageNum}`].result==="ahn"&&"#5704E2",
                        color:counting[`qa_${pageNum}`].result==="ahn"&&"#fff"}}     
                        onClick={selectLogic}>{qusestionList[pageNum-1].ahn.text}</button>
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