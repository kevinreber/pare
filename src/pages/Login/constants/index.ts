const demoIDs = [
	'155e77eeba6d486f0e0c0fb4b919',
	'9882qefga6d486f0e0c0fb4b919',
	'155e77eeba6d0bnwfasfb4b919',
	'e7092bvvaeba6d486f0e0c919',
	'097hasdvammkl77eellaweff',
	'poiunasdfy691997485b332351',
	'47yyhkkaser13rgr4567sfhqrga',
	'mngeoi7623hhh22adfasrg9786',
	'auwlf7ofqo24nc7qo49w9q479t97',
	'0976g3bjsgjhhhaajsf4vw34v635',
	'15683jnvghyasdjfq4c977mq34gnc',
	'7nbfhjjjgasdfyyf3q4cq24c5q34b76',
	'9724q7vnn4wvtiqv34vtqaretvertby556',
	'aw987e7yooq7y24bwbobkgbasgdfasooa44',
];

export const getRandomID = (): string => {
	return demoIDs[Math.floor(Math.random() * demoIDs.length)];
};
