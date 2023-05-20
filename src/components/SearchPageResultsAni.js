import React, {useState} from 'react';
import LastReleaseV from "./LastReleaseV";
import NoResultsBlock from "./NoResultsBlock";

const SearchPageResultsAni = ({result, query}) => {

    return (
        <div className="releases_items">
            {
                // result?.list?.map(e => <AnimeLine anime_info={e} key={e.id}/>)     | anime_list
                result?.list?.map(e => <LastReleaseV anime_info={e} key={e.id}/>)
            }

            <NoResultsBlock result={result} query={query}/>


        </div>
    );
};

export default SearchPageResultsAni;