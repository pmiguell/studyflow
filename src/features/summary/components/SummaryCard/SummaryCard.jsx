import style from "./SummaryCard.module.css"
import {Ellipsis, Book} from "lucide-react"

export default function SummaryCard({
    title,
    subject
}){
    return(
        <div className={style.summaryCard}>
            <div className={style.summaryCardTop}>
                <div className={style.summaryCardHeader}>
                    <p className={style.summaryCardTitle}>{title}</p>
                    <button className={style.summaryCardSettings}>
                        <Ellipsis />
                    </button>
                </div>
                <p className={style.summaryCardView}>Ver resumo</p>
            </div>

            <div className={style.summaryCardBottom}>
                <span className={style.summarySubject}><Book className={style.bookIcon}/>{subject}</span>
            </div>
        </div>
    )
}