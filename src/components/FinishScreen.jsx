import styles from "./WelcomeScreen.module.css";
import CardModal from "../lib/card/CardModal";
import { useState } from "react";
import Card from "../lib/card/Card";
import CardLayout from "lib/card/CardLayout";
import FancyHeader from "../lib/FancyHeader";
import Button from "../lib/Button";

function FinishScreen() {
  const [showModal, setShowModal] = useState(true);

  const content = (
    <div className={styles.content}>
      <div className={styles.header}>
        <div className={styles.subheading}>XI ФЕСТИВАЛЬ САПСЁРФИНГА</div>
        <div className={styles.title}>
          <FancyHeader text={"ФОНТАНКА SUP"} />
        </div>
      </div>
      <div className={styles.description}>
        <p>Поздравляем, вы ответили на все вопросы!</p>
        <p>
          В разработке квеста приняли участие студенты первых и вторых курсов
          Университета ИТМО:
        </p>
        <p>
          Алам Сират, Алексеев Никита, Алешин Даниил, Аминев Тимур, Архипова
          Анна, Багринцев Михаил, Бакановская Данута, Басхалова Полина, Брюхов
          Антон, Бурлак Илья, Ваганова Мария, Ведерникова Екатерина, Габов
          Богдан, Геворкян Баграт, Гришко Юлия, Дорошенко Артём, Кирюшкина
          Ксения, Козьяков Арсений, Космынина Софья, Костыгов Андрей, Крамарь
          Кирилл, Красноперова Ульяна, Кулешова Виктория, Ливицкая Марья, Ляхов
          Даниил, Мордовина Мария, Мурысин Максим, Нгуен Тхи Тхуи Зыонг, Огнев
          Марк, Орлова Валерия, Охотникова Мария, Павлова Илона, Пан Артём,
          Пилипенко Анна, Постникова Марина, Соловьев Михаил, Хабаров Никита,
          Харисова Мария, Царева Екатерина, Шиптенко Владислав, Шишакова
          Елизавета, Якименко Владислав
        </p>
        <p>
          Особая благодарность студентам, взявшим на себя основную часть работы,
          а также доработку проекта: Аминеву Тимуру, Гришко Юлии, Постниковой
          Марине, Соловьеву Михаилу и Царевой Виктории
        </p>
        <p>
          Работу курировала сотрудник Центра социальных и гуманитарных наук НИУ
          ИТМО Юлия Кудина
        </p>
      </div>
      <Button onClick={() => setShowModal(false)}>Вернуться на главную</Button>
    </div>
  );

  return (
    <CardModal showModal={showModal} setShowModal={setShowModal}>
      <Card
        isFront={true}
        front={<CardLayout>{content}</CardLayout>}
        opacity={0.9}
      />
    </CardModal>
  );
}

export default FinishScreen;
