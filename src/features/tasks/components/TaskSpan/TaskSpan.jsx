import style from './TaskSpan.module.css';

export default function TaskSpan({ content }) {
    return (
        <span className={style.taskSpan}>
            {content}
        </span>
    )
}