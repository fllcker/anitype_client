import React, {useEffect} from 'react';
import NoResultsBlock from "./NoResultsBlock";
import HorizontalKodikAnimeLine from "./HorizontalAnimeLine";


const SearchPageResultsKodik = ({result, query}) => {
    useEffect(() => {
        console.log('SearchPageResultsKodik', result)
    }, [result])

    return (
        <>
            <div className="kodik_release_items">

                {/*<HorizontalKodikAnimeLine title1={} />*/}
                {
                    (result?.length > 0) &&
                    <>{
                        result.map(hkal => <HorizontalKodikAnimeLine key={hkal?.id} title1={hkal?.title} title2={hkal?.title_orig}
                                                                     title3={hkal?.other_title} year={hkal?.year} quality={hkal?.quality} />)
                    }</>
                }

            </div>

        {/*    No results block*/}
            {
                (query !== '' && (!result || result.length === 0)) &&
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
        {/*    */}
        </>

    );
};

export default SearchPageResultsKodik;