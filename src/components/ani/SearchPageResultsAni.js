import React, {useState} from 'react';
import LastReleaseAni from "./LastReleaseAni";
import NoResultsBlock from "../NoResultsBlock";

const SearchPageResultsAni = ({result, query}) => {

    return (
        <div className="releases_items">
            {
                // result?.list?.map(e => <AnimeLine anime_info={e} key={e.id}/>)     | anime_list
                result?.list?.map(e => <LastReleaseAni anime_info={e} key={e.id}/>)
            }

            <NoResultsBlock result={result} query={query}/>


        </div>
    );
};

export default SearchPageResultsAni;