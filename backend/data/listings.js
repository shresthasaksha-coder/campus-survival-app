// Curated directory, not live availability. Review source links before updating entries.
const reviewedAt = '2026-10-19';
export const housing = [
 {id:'bruce-hall',name:'Bruce Hall',category:'on-campus',location:'1624 Chestnut St, Denton',description:'UNT residence hall. Check room types and current availability with Housing.',price:'See official rates by room type',distance:null,contact:'940-565-4343',sourceUrl:'https://housing.unt.edu/residence-halls/index.html',ratesUrl:'https://housing.unt.edu/rates/index.html',reviewedAt},
 {id:'clark-hall',name:'Clark Hall',category:'on-campus',location:'1717 Maple St, Denton',description:'On-campus housing option listed in the UNT residence hall directory.',price:'See official rates by room type',distance:null,contact:'940-565-4588',sourceUrl:'https://housing.unt.edu/residence-halls/index.html',ratesUrl:'https://housing.unt.edu/rates/index.html',reviewedAt},
 {id:'maple-hall',name:'Maple Hall',category:'on-campus',location:'1621 Maple St, Denton',description:'Explore room information through the official residence hall directory.',price:'See official rates by room type',distance:null,contact:'940-565-4389',sourceUrl:'https://housing.unt.edu/residence-halls/index.html',ratesUrl:'https://housing.unt.edu/rates/index.html',reviewedAt},
 {id:'off-campus',name:'Off-campus housing guidance',category:'off-campus',location:'Denton area',description:'Start your off-campus housing research with UNT guidance and linked resources.',price:null,distance:null,contact:'See official guidance',sourceUrl:'https://housing.unt.edu/living-on-campus/off-campus_housing.html',reviewedAt},
 {id:'unt-housing',name:'UNT Housing & Residence Life',category:'on-campus',location:'UNT, Denton',description:'Start here for residence hall options, applications, room types, and housing guidance.',price:null,distance:null,contact:'housinginfo@unt.edu',sourceUrl:'https://housing.unt.edu/',reviewedAt},
 {id:'housing-support',name:'Housing questions & support',category:'support',location:'UNT Welcome Center, 1417 Maple St, Denton',description:'Contact the housing office for questions about university housing.',price:null,distance:null,contact:'940-565-2610',sourceUrl:'https://housing.unt.edu/',reviewedAt}
];
export const dining = [
 {id:'eagle-landing',name:'Eagle Landing',category:'dining-hall',location:'UNT, Denton',description:'Explore this UNT dining hall through Dining Services.',hours:null,dietary:[],sourceUrl:'https://dining.unt.edu/hours/dining-halls/eagle-landing.html',reviewedAt},
 {id:'mean-greens',name:'Mean Greens Café',category:'dining-hall',location:'UNT, Denton',description:'Plant-based dining at UNT.',hours:null,dietary:['vegan'],sourceUrl:'https://dining.unt.edu/hours/dining-halls/mean_greens_cafe.html',reviewedAt},
 {id:'bruceteria',name:'Bruceteria',category:'dining-hall',location:'UNT, Denton',description:'Find current dining information through UNT Dining Services.',hours:null,dietary:[],sourceUrl:'https://dining.unt.edu/hours/index.html',reviewedAt},
 {id:'champs',name:'Champs',category:'dining-hall',location:'UNT, Denton',description:'Browse this campus dining option and check current hours before visiting.',hours:null,dietary:[],sourceUrl:'https://dining.unt.edu/hours/index.html',reviewedAt},
 {id:'union-retail',name:'Union retail dining',category:'retail',location:'UNT Union, Denton',description:'Explore retail dining options listed by UNT Dining Services.',hours:null,dietary:[],sourceUrl:'https://dining.unt.edu/hours/index.html',reviewedAt}
];
export function filterListings(items, params) {
 const q = (params.get('q') || '').trim().toLowerCase();
 const category = params.get('category') || 'all';
 const dietary = params.get('dietary') || 'all';
 return items.filter(item => (!q || [item.name,item.description,item.location,...(item.dietary||[])].join(' ').toLowerCase().includes(q)) && (category==='all'||item.category===category) && (dietary==='all'||item.dietary?.includes(dietary)));
}
