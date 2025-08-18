import style from "./SummaryPage.module.css";
import ActionsContainer from "../../../tasks/components/ActionsContainer/ActionsContainer";
import SummaryCard from "../../components/SummaryCard/SummaryCard";

export default function SummaryPage(){
    return(
        <div className={style.summaryPage}>
            <ActionsContainer/>
            <div className={style.summaryContainer}>
                <SummaryCard
                title = {"Resumo Série de Fourrier"}
                subject = {"Cálculo 1"}
                />
                <SummaryCard
                title = {"Resumo Sequências"}
                subject = {"Cálculo 1"}
                />
            </div>
        </div>
    )
}