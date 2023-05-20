import React from 'react';

const NoResultsBlock = ({query, result}) => {
    return (
        <>
            {
                (query !== '' && (!result || !result.list || result?.list?.length === 0)) &&
                <div className="release_items_null">
                    <p className="release_items_null_h1">:(</p>
                    <p className="release_items_null_text">Нет результатов</p>
                </div>
            }

            {
                (query === '') &&
                <div className="release_items_null">
                    <p className="release_items_null_h1">{'<-'}</p>

                    <p className="release_items_null_text">Введите запрос</p>
                </div>
            }
        </>
    );
};

export default NoResultsBlock;