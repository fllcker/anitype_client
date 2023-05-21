import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

const PravoPage = () => {
    return (
        <>
            <Header/>

            <div className="page">
                <div className="page_content">
                    <h1>Для правообладателей</h1>

                    <p>Если вы обнаружили материал, представленный на нашем сайте, который нарушает ваши авторские права, или же дискредитирует Вашу компанию, предоставляя неверную или искаженную информацию, пожалуйста свяжитесь с нами для решения этого вопроса.

                    </p>

                    <p>Для этого необходимо отправить e-mail с вашего почтового ящика содержащий:
                        контактные данные, реквизиты вашей компании;
                        прямую ссылку(ссылки) на материал, который вы считаете спорным;
                        заверенные сканированные копии документов, подтверждающих ваше эксклюзивное право на материал;
                        в случае, если вы представляете интересы другой компании – копии документов на посреднические услуги, на адрес jxwide@gmail.com</p>

                    <p>Вся информация будет проверена, и администрация сайта в кратчайшие сроки свяжется с вами для урегулирования спорного вопроса.

                        Весь контент на сайте предоставлен для бесплатного домашнего ознакомительного просмотра.</p>
                </div>
            </div>

            <Footer/>
        </>
    );
};

export default PravoPage;