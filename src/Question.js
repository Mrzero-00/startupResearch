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
            font-size:1.3rem;
            font-weight:600;
        }
        .qaGage{
            width:90%;
            max-width:432px;
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
        width:100%;
        height:100%;
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
            font-size:1rem;
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
            qa:'정부의 스타트업 육성 방식은 어때야 할까?',
            yoon:{
                text:'정부는 직접 나서 산업을 육성하기보다 <b>민간에서 자율적으로 기업 활동을 할 수 있는 여건을 만들어줘야 한다.</b>',//yoon
                link:"(윤석열, 21년7월8일, 팁스타운 간담회)"
            },
            lee:{
                text:'정부는 <b>적극적으로 책임을 이행</b>함으로써 스타트업이 자유롭게 창의와 혁신을 실천할 기회를 마련해줘야 한다.',//lee
                link:"(이재명, 21년11월8일, 스타트업 정책 토크)"
            },
            shim:{
                text:"우리 경제의 시스템과 철학을 완전히 바꾸겠다. <b>기술-노동, 시장-사회, 인간-지구가 공존하는 신질서</b>를 수립하겠다.",
                link:"(심상정, 22년 2월 7일, ‘그린노믹스, 공존과 번영의 신경제)"
            },//shim
            ahn:{
                text:'특별법적 지위를 가진 <b>전담부서와 함께 우선적이고 파격적인 규제 혁신</b>을 이뤄 내겠다.',
                link:"(안철수, 22년2월4일, 중기중앙회)"
            }//ahn
        },
        {
            id:2,
            qa:"스타트업 규제, 바람직한 방향은?",
            yoon:{
                text:'강한 국가가 되려면 대기업뿐 아니라 강소기업도 많이 보유해야 한다. 때문에 <b>정치가 자유로운 기업 활동을 방해하지 않아야 한다.</b>',//yoon
                link:"(윤석열, 21년7월8일, 스타트업 대표 간담회)"
            },
            lee:{
                text:'과도한 규제, 일종의 진입장벽이 창업 성장을 훼손하고 있다. <b>금지된 것 외에는 자유롭게 할 수 있는 산업 환경을 만들어야</b> 한다.',//lee
                link:"(이재명, 21년11월8일, 스타트업 정책토크)"
            },
            shim:{
                text:"<b>법으로 플랫폼경제 민주화</b>를 이루겠다. 디지털은행에도 금산분리원칙을 강화하고 플랫폼기업들의 개인정보 남용을 막아 시민의 정보권을 지키겠다.",
                link:"(심상정, 22년 2월 7일, ‘플랫폼경제 민주화 공약)"
            },//shim
            ahn:{
                text:'인간의 생명과 안전에 대한 규제는 강화하되 <b>신산업 관련 규제는 안 되는 것 몇 가지만 금지하고 나머지는 허용하는 네거티브 방식으로 바꿔야</b> 한다.',
                link:"(안철수, 22년1월19일, 카이스트 과학정책 대화 )"
            }//ahn
        },
        {
            id:3,
            qa:"다음 중 당신이 생각하는 '공정성'을 가장 잘 대변하는 발언은?",
            yoon:{
                text:'<b>작은 기업이 대기업으로 성장할 기회</b>가 제대로 부여되는 사회가 공정한 사회',//yoon
                link:"(윤석열, 21년7월8일, 팁스타운 간담회)"
            },
            lee:{
                text:'공정한 성장이란 <b>대기업-중소기업, 자본-노동이 상생·협력</b>하는 것',//lee
                link:"(이재명, 21년12월8일, 중소벤처기업 정책공약)"
            },
            shim:{
                text:"<b>청년, 비정규직 등 노동시장 취약계층 대상 정책을 확대</b>해 기울어진 운동장을 바로잡을 것",
                link:"(심상정, 22년 2월 11일, 더스쿠프-한국사회공헌협회 공동기획)"
            },//shim
            ahn:{
                text:'<b>강성 귀족노조를 타파해야 한다.</b> 이들이 기득권을 지키기 위해 청년들의 꿈을 짓밟고 노동시장을 왜곡시키지 못하도록 모든 수단을 강구할 것',
                link:"(안철수, 22년 1월 26일, 페이스북 세번째 민노총 혁파 정책)"
            }//ahn
        },
        {
            id:4,
            qa:"청년 창업 활성화를 위해 정부는 무엇을 해야 할까?",
            yoon:{
                text:'<b>대학을 창업 기지화</b>하고 학생수 감소에 따른 여유 인프라를 대학창업기지로 전환해 창업가를 양성',//yoon
                link:"(윤석열, 21년12월26일, 상식회복을 위한 성장과 복지의 선순환 공약)"
            },
            lee:{
                text:'벤처 기업가 선배들과 정부가 1조원 규모 <b>창업연대기금</b>을 조성, <b>실패해도 재기할 수 있는 안전망</b>을 설치',//lee
                link:"(이재명, 21년12월8일, 중소벤처기업 정책공약)"
            },
            shim:{
                text:"<b>직업교육 마스터플랜</b>을 마련하고 <b>산학연계 일자리 창출 방안</b>과 <b>지역연계 선순환 창업 지원 방안</b>을 마련",
                link:"(심상정, 21년 12월 13일, '위기의 대학, 공유경제를 만나다에서)"
            },//shim
            ahn:{
                text:"각 시도에 특수목적고를 세우고 <b>평생교육체계를 구축</b>하는 한편 인재들이 자유롭게 창업하는 <b>창업혁신캠퍼스를 조성</b>",
                link:"(안철수, 22년2월4일, 중기중앙회)"
            }//ahn
        },
        {
            id:5,
            qa:"당신이 벤처 창업가라면 다음 중 어떤 정책을 가장 반길까?",
            yoon:{
                text:'<b>벤처기업 스톡옵션 비과세</b> 한도를 현행 3000만원에서 2억원으로 높이는 등 벤처기업 창업 및 취업 유인책을 확대',//yoon
                link:"(윤석열, 21년12월26일, 상식회복을 위한 성장과 복지의 선순환 공약)"
            },
            lee:{
                text:'2027년까지 <b>정부 벤처투자 예산을 10조원으로 늘리고</b> 연 30만곳의 신기술·신산업 창업을 유도',//lee
                link:"(이재명, 21년12월8일, 중소벤처기업 정책공약)"
            },
            shim:{
                text:"<b>기업의 지방 이전과 지방 창업을 독려</b>하기 위한 강력한 인센티브를 제공",
                link:"(심상정, 22년 2월 11일, 더스쿠프-한국사회공헌협회 공동기획)"
            },//shim
            ahn:{
                text:"<b>금융기관에서 매년 10조원씩, 5년간 총 50조원의 모험자본을 공급</b>하고 정부가 특별보증 등으로 매년 1조원을 지원",
                link:"(안철수, 22년2월4일, 중기중앙회)"
            }//ahn
        },
        {
            id:6,
            qa:"일자리 창출을 위해 가장 필요한 정책은 무엇일까?",
            yoon:{
                text:'<b>신산업 생태계 조성, 세대별 맞춤 일자리 공급</b>, 중소·중견기업의 신산업 금융 지원 및 투자금 세액공제 확대 ',//yoon
                link:"(윤석열, 21년12월28일, 주한미국상공회의소 간담회)"
            },
            lee:{
                text:"<b>기업 주도의 일자리 성장</b>을 촉진하고 <b>강력한 일자리 환류 정책</b>을 추진",//lee
                link:"(이재명, 22년1월18일, 일자리 대전환 6대 공약)"
            },
            shim:{
                text:"원하는 모든 청년에게 생활임금과 사회보험, 이직 준비와 교육을 제공하는 <b>'국가 일자리보장제'</b>를 실시",
                link:"(심상정, 22년2월21일, 한겨레 지역균형 공약질의서)"
            },//shim
            ahn:{
                text:'디스플레이, 이차전지, 차세대원전, 수소에너지, 바이오산업 등 초격차 과학 기술을 5개 확보해 삼성전자 급 <b>선도기업을 육성함으로써 일자리를 창출</b>',
                link:"(안철수, 22년2월13일, 555 신성장전략 공약)"
            }//ahn
        },
        {
            id:7,
            qa:"'주 52시간 근무' '주 4일제'에 대한 당신의 생각은?",
            yoon:{
                text:'주 52시간제도 기업과 근로자가 처한 현실을 잘 반영해야 한다. 주 단위만 고집할 것이 아니라 3개월이나 6개월 단위 등으로 <b>탄력적으로 운영해야</b> 한다.',//yoon
                link:"(윤석열, 21년12월2일, 페이스북)"
            },
            lee:{
                text:'우리 국민은 경제협력개발기구 평균보다 훨씬 많이 일한다. <b>주 4.5일제 도입</b>을 위한 사회적 대화를 시작하고 단계적 도입을 위한 시범 사업을 추진해야 한다.',//lee
                link:"(이재명, 22년1월26일, 노동 공약)"
            },
            shim:{
                text:"시간빈곤으로 인한 여가·휴식시간 부족은 생산성을 저하시키고 또 다른 불평등을 야기하고 있다. <b>주 4일제를 도입</b>해 시간빈곤 대한민국을 극복할 때다.",
                link:"(심상정, 22년 2월 11일, 더스쿠프-한국사회공헌협회 공동기획)"
            },//shim
            ahn:{
                text:'현재 주 52시간제는 너무 경직돼 있다. <b>주 52시간제에 대해서는 유연성을 가져야</b> 한다. 업종에 따라 예외도 허용해야 한다.',
                link:"(안철수, 22년2월4일, 중소기업 미래비전 프로젝트행사에서)"
            }//ahn
        },
        {
            id:8,
            qa:"당신이 생각하는 '저성장 시대', 그리고 극복 방안은?",
            yoon:{
                text:'<b>4차 산업혁명</b>을 통해 극복해야 한다. 4차 산업혁명은 판 기술과 첨단 기술의 개발 및 상용화뿐 아니라 기존 산업의 기술적 업그레이드와 생산성 향상, 생산 형태의 변화를 가져온다.',//yoon
                link:"(윤석열, 22년2월7일, 상공회의소 초청강연)"
            },
            lee:{
                text:'<b>전환적 성장</b>으로 경제를 우상향 성장 곡선으로 회복시켜야 한다. <b>국가 주도로 대대적인 공동투자를 집행</b>해 기후 위기를 극복하고 탈탄소 사회를 선도해야 한다.',//lee
                link:"(이재명, 21년8월22일, 크로스캠퍼스 간담회)"
            },
            shim:{
                text:'태양광과 풍력·첨단 배터리·전기차 기술·그린수소·생태농어업 등 <b>5대 녹색기술혁신과 녹색산업혁명 시대를 열어 국가 신성장 동력을 마련</b>해야 한다.',
                link:"(심상정, 22년2월10일, 대선후보 초청 과학기술 정책토론회)"
            },//shim
            ahn:{
                text:'한국이 세계적으로 강점을 가진 분야가 무엇인지 살펴보고 <b>초격차를 나타내는 분야에 집중 투자</b>해야 한다.',
                link:"(안철수, 22년2월7일, G3 디지털경제 강국 도약을 위한 정책간담회)"
            }//ahn
        },
        {
            id:9,
            qa:"ESG(환경·사회·지배구조) 경영에 대한 당신의 생각에 가장 가까운 발언은?",
            yoon:{
                text:"모든 중소기업에 ESG를 요구하기는 매우 어렵다. 기업이 <b>'ESG 투자로 인해 얻는 것이 많다'고 느낄 만한 제도적 여건</b>은 차차 만들어가겠다.",//yoon
                link:"(윤석열, 22년2월7일, 상공회의소 초청강연)"
            },
            lee:{
                text:'ESG는 자본시장 선진화의 한 방법이다. <b>ESG 경영 지표를 체계화해 평가하고 기준에 부합하는 기업에는 혜택을</b> 줘야 한다.',//lee
                link:"(이재명, 21년11월4일, 주식시장 발전과 개인투자자 보호를 위한 간담회')"
            },
            shim:{
                text:"<b>ESG경영의 제1 실천 과제는 안전</b>이다. '기업 하다 보면 사람 죽을 수도 있지'라는 생각을 과감하게 단절해야 한다.",
                link:"(심상정, 22년1월19일, 대한상공회의소 간담회)"
            },//shim
            ahn:{
                text:'<b>그린 경영을 도입</b>해야 한다. 산업의 경쟁력을 유지하면서 <b>새로운 기술 개발을 통해 탄소중립</b>의 길로 가는 지혜를 찾아야 한다.',
                link:"(안철수, 22년2월15일, 환경일보 인터뷰)"
            }//ahn
        },
        {
            id:10,
            qa:"디지털 전환의 시대, 핵심 부처인 과학기술정보통신부의 정책 공약 중 가장 마음에 드는 것은?",
            yoon:{
                text:"우리 정부를 디지털 기술과 빅데이터에 기반한 국민 맞춤형 서비스 정부인 <b>'디지털 플랫폼 정부'</b>로 탈바꿈",//yoon
                link:"(윤석열, 22년1월2일, 디지털플랫폼 정부 공약)"
            },
            lee:{
                text:'데이터의 수집·축적·전달을 위해 <b>사물인터넷(IoT), 클라우드, 5G/6G</b> 등 3대 인프라를 구축하고 이들을 밀접하게 연결',//lee
                link:"(이재명, 21년11월26일, 디지털 전환 성장 공약)"
            },
            shim:{
                text:"취약한 기초연구 토대, 지역 간 불균형한 과학기술 인프라 등 우리 <b>과학 기술 발전을 가로막는 고질병 해소</b>",
                link:"(심상정, 22년2월10일, 과학기술 공약)"
            },//shim
            ahn:{
                text:'<b>과학기술부총리직을 신설</b>하고 대통령 직속으로 <b>국가미래전략위원회를 설치</b>해 과학 경제 강국을 준비',
                link:"(안철수, 22년2월13일, 555 신성장전략 공약)"
            }//ahn
        },
    ]
    const selectLogic = (name)=>{
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
    console.log(qusestionList[pageNum-1].yoon);
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
                <button name="lee"  
                    style={{
                        backgroundColor:counting[`qa_${pageNum}`].result==="lee"&&"#5704E2",
                        color:counting[`qa_${pageNum}`].result==="lee"&&"#fff"}}  
                        onClick={()=>{selectLogic("lee")}}
                        dangerouslySetInnerHTML={{__html:qusestionList[pageNum-1].lee.text}}></button>
                <button name="yoon" 
                    style={{
                        backgroundColor:counting[`qa_${pageNum}`].result==="yoon"&&"#5704E2",
                        color:counting[`qa_${pageNum}`].result==="yoon"&&"#fff"}}  
                        onClick={()=>{selectLogic("yoon")}}
                        dangerouslySetInnerHTML={{__html:qusestionList[pageNum-1].yoon.text}}></button>
                <button name="shim" 
                    style={{
                        backgroundColor:counting[`qa_${pageNum}`].result==="shim"&&"#5704E2",
                        color:counting[`qa_${pageNum}`].result==="shim"&&"#fff"}}     
                        onClick={()=>{selectLogic("shim")}}
                        dangerouslySetInnerHTML={{__html:qusestionList[pageNum-1].shim.text}}></button>
                <button name="ahn"  
                    style={{
                        backgroundColor:counting[`qa_${pageNum}`].result==="ahn"&&"#5704E2",
                        color:counting[`qa_${pageNum}`].result==="ahn"&&"#fff"}}    
                        onClick={()=>{selectLogic("ahn")}}
                        dangerouslySetInnerHTML={{__html:qusestionList[pageNum-1].ahn.text}}></button>
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