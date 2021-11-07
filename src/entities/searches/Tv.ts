export interface ITv {
    page: number; 
    // results?: Result[]; // プロパティに「?」をつけることで全てのオブジェクトにResults配列がなくてもOKになる。
    results: IResult[]; 
    total_pages: number; 
    total_results: number;
}

export interface IResult {
    backdrop_path: string | null;
    first_air_date: string;
    genre_ids: Array<number>;
    id:	number;
    name: string;
    origin_country:	Array<string>;
    original_language: string;
    original_name: string;
    overview: string;
    popularity:	number;
    poster_path: string | null;
    vote_average: number;
    vote_count:	number;
}

// class Tv implements ITv {
//     backdrop_path: string | null;
//     first_air_date: string;
//     genre_ids: Array<number>;
//     id:	number;
//     name: string;
//     origin_country:	Array<string>;
//     original_language: string;
//     original_name: string;
//     overview: string;
//     popularity:	number;
//     poster_path: string | null;
//     vote_average: number;
//     vote_count:	number;

// }

// export default Tv;
