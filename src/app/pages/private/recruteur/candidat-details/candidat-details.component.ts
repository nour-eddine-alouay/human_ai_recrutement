import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidat-details',
  templateUrl: './candidat-details.component.html',
  styleUrls: ['./candidat-details.component.css']
})
export class CandidatDetailsComponent implements OnInit{

  selectedTab : number = 1

  ngOnInit(): void {
    this.minVal = 0
    this.maxVal = 10
  }

  minVal !: number
  maxVal !: number
  firstNWordOfString(s: string, n: number): string {
    const words = s.split(' ')
    return words.slice(0, n).join(' ')
  }
  Valeurs : string [] = [
    "L'intégrité",
    "L'innovation",
    "La responsabilité sociale",
    "L'excellence",
    "La collaboration, Le travail d'équipe",
    "L'engagement envers le client",
    "La diversité et l'inclusion",
    "La transparence",
    "La sécurité",
    "La croissance",
    "La flexibilité",
    "La confiance",
    "L'apprentissage continu",
    "L'empathie",
    "L'efficacité",
    "L'orientation client",
    "La qualité de vie au travail",
    "L'ouverture d'esprit",
    "La créativité",
    "La durabilité",
    "La communication",
    "La confiance en soi",
    "L'engagement envers l'excellence du service client",
    "La flexibilité de l'horaire",
    "La culture de l'apprentissage",
    "L'humilité",
    "La volonté de prendre des risques",
    "La réactivité",
    "La passion",
    "La loyauté",
    "La responsabilité personnelle",
    "La résilience",
    "La gestion du temps",
    "L'authenticité",
    "La reconnaissance",
    "La diversité des talents",
    "La collaboration",
    "La sécurité financière",
    "La croissance personnelle",
    "La qualité",
    "L'innovation",
    "La transparence",
    "La responsabilité sociale",
    "L'agilité",
    "La créativité",
    "La durée de vie du produit",
    "L'orientation résultats",
    "La confidentialité",
    "La responsabilité environnementale",
    "La résolution de problèmes",
  ]
  Descriptions : string [] = [
    "Le respect de l'éthique professionnelle et la prise de décisions éthiques.",
    "La recherche de nouvelles idées et la créativité pour améliorer la qualité des produits ou des services de l'entreprise.",
    "La prise en compte des impacts sociaux et environnementaux de l'activité de l'entreprise et la mise en place de pratiques durables.",
    "La poursuite de la qualité et de la perfection dans toutes les activités de l'entreprise.",
    "La collaboration et la communication efficace entre les membres de l'équipe pour atteindre les objectifs de l'entreprise.",
    "La satisfaction du client comme priorité et la création d'une relation de confiance avec les clients.",
    "La promotion d'un environnement de travail inclusif et diversifié où toutes les personnes sont traitées avec respect.",
    "La communication ouverte et honnête avec les parties prenantes de l'entreprise, y compris les employés, les clients et les actionnaires.",
    "La priorité donnée à la sécurité des employés, des clients et de tous ceux qui interagissent avec l'entreprise.",
    "La recherche d'une croissance durable de l'entreprise qui bénéficie à toutes les parties prenantes et assure une pérennité à long terme.",
    "L'adaptabilité aux changements et aux défis, et la capacité à trouver des solutions créatives.",
    "La confiance envers les membres de l'équipe, les clients et les partenaires commerciaux.",
    "La volonté d'apprendre et d'améliorer les compétences, les connaissances et les pratiques professionnelles.",
    "La capacité à comprendre les perspectives et les besoins des autres.",
    "La recherche de l'efficacité dans toutes les activités de l'entreprise pour optimiser les résultats.",
    "La priorité donnée aux besoins et aux attentes des clients.",
    "La création d'un environnement de travail sain et équilibré pour les employés.",
    "La capacité à considérer différentes perspectives et à embrasser la diversité.",
    "La recherche de nouvelles idées et la capacité à innover dans les activités de l'entreprise.",
    "La mise en place de pratiques durables pour minimiser l'impact environnemental de l'entreprise et promouvoir la durabilité à long terme.",
    "La promotion d'une communication claire et ouverte entre les membres de l'équipe et avec les clients.",
    "La confiance en ses propres compétences et en la capacité de l'entreprise à réussir.",
    "La priorité donnée à la satisfaction des clients en offrant un excellent service client.",
    "La capacité à offrir des horaires de travail flexibles pour les employés afin de répondre à leurs besoins personnels et professionnels.",
    "La promotion de la formation continue et du développement des compétences des employés.",
    "La capacité à reconnaître ses erreurs et à travailler pour les corriger.",
    "La capacité à prendre des risques calculés pour atteindre les objectifs de l'entreprise.",
    "La capacité à répondre rapidement aux besoins des clients et à résoudre les problèmes.",
    "L'engagement envers la mission de l'entreprise et la passion pour ce qu'elle fait.",
    "La fidélité envers l'entreprise, les membres de l'équipe et les clients.",
    "La prise de responsabilité individuelle pour les actions et les résultats.",
    "La capacité à surmonter les obstacles et les défis.",
    "La capacité à gérer efficacement son temps pour atteindre les objectifs de l'entreprise.",
    "La promotion d'une culture d'entreprise authentique qui reflète les valeurs et la mission de l'entreprise.",
    "La reconnaissance des réalisations et des contributions des membres de l'équipe.",
    "La promotion de la diversité des talents et des compétences au sein de l'entreprise.",
    "La capacité à travailler en collaboration avec d'autres équipes et partenaires commerciaux.",
    "La gestion financière responsable et la sécurité financière pour les employés, les clients et les actionnaires.",
    "La promotion de la croissance personnelle et professionnelle des employés.",
    "La recherche de la qualité dans toutes les activités de l'entreprise, du produit ou du service jusqu'à l'expérience client.",
    "La capacité à créer des solutions innovantes pour résoudre les problèmes et à anticiper les tendances futures.",
    "La promotion d'une communication ouverte et transparente avec les employés, les clients et les partenaires commerciaux.",
    "La prise en compte de l'impact de l'entreprise sur la société et l'environnement et la promotion d'une responsabilité sociale.",
    "La capacité à s'adapter rapidement aux changements du marché et de l'environnement commercial.",
    "La promotion d'une culture de la créativité pour générer de nouvelles idées et des solutions innovantes.",
    "La promotion de la durée de vie des produits et de l'utilisation de matériaux durables pour minimiser l'impact environnemental.",
    "La priorité donnée aux résultats et à l'atteinte des objectifs de l'entreprise.",
    "La protection des données confidentielles des clients et des employés.",
    "La prise en compte de l'impact de l'entreprise sur l'environnement et la promotion de pratiques durables.",
    "La capacité à résoudre rapidement les problèmes et les défis rencontrés par l'entreprise.",
  ]
  valeurs_descriptions = [
    {
    "valeur" : "L'intégrité",
    "description" : "Le respect de l'éthique professionnelle et la prise de décisions éthiques.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "L'innovation",
    "description" : "La recherche de nouvelles idées et la créativité pour améliorer la qualité des produits ou des services de l'entreprise.",
    "isExpanded" : false,
    "star" : true
    },
    {
    "valeur" : "La responsabilité sociale",
    "description" : "La prise en compte des impacts sociaux et environnementaux de l'activité de l'entreprise et la mise en place de pratiques durables.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "L'excellence",
    "description" : "La poursuite de la qualité et de la perfection dans toutes les activités de l'entreprise.",
    "isExpanded" : false,
    "star" : true
    },
    {
    "valeur" : "La collaboration, Le travail d'équipe",
    "description" : "La collaboration et la communication efficace entre les membres de l'équipe pour atteindre les objectifs de l'entreprise.",
    "isExpanded" : false,
    "star" : true
    },
    {
    "valeur" : "L'engagement envers le client",
    "description" : "La satisfaction du client comme priorité et la création d'une relation de confiance avec les clients.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La diversité et l'inclusion",
    "description" : "La promotion d'un environnement de travail inclusif et diversifié où toutes les personnes sont traitées avec respect.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La transparence",
    "description" : "La communication ouverte et honnête avec les parties prenantes de l'entreprise, y compris les employés, les clients et les actionnaires.",
    "isExpanded" : false,
    "star" : true
    },
    {
    "valeur" : "La sécurité",
    "description" : "La priorité donnée à la sécurité des employés, des clients et de tous ceux qui interagissent avec l'entreprise.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La croissance",
    "description" : "La recherche d'une croissance durable de l'entreprise qui bénéficie à toutes les parties prenantes et assure une pérennité à long terme.",
    "isExpanded" : false,
    "star" : true
    },
    {
    "valeur" : "La flexibilité",
    "description" : "L'adaptabilité aux changements et aux défis, et la capacité à trouver des solutions créatives.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La confiance",
    "description" : "La confiance envers les membres de l'équipe, les clients et les partenaires commerciaux.",
    "isExpanded" : false,
    "star" : true
    },
    {
    "valeur" : "L'apprentissage continu",
    "description" : "La volonté d'apprendre et d'améliorer les compétences, les connaissances et les pratiques professionnelles.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "L'empathie",
    "description" : "La capacité à comprendre les perspectives et les besoins des autres.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "L'efficacité",
    "description" : "La recherche de l'efficacité dans toutes les activités de l'entreprise pour optimiser les résultats.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "L'orientation client",
    "description" : "La priorité donnée aux besoins et aux attentes des clients.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La qualité de vie au travail",
    "description" : "La création d'un environnement de travail sain et équilibré pour les employés.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "L'ouverture d'esprit",
    "description" : "La capacité à considérer différentes perspectives et à embrasser la diversité.",
    "isExpanded" : false,
    "star" : true
    },
    {
    "valeur" : "La créativité",
    "description" : "La recherche de nouvelles idées et la capacité à innover dans les activités de l'entreprise.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La durabilité",
    "description" : "La mise en place de pratiques durables pour minimiser l'impact environnemental de l'entreprise et promouvoir la durabilité à long terme.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La communication",
    "description" : "La promotion d'une communication claire et ouverte entre les membres de l'équipe et avec les clients.",
    "isExpanded" : false,
    "star" : true
    },
    {
    "valeur" : "La confiance en soi",
    "description" : "La confiance en ses propres compétences et en la capacité de l'entreprise à réussir.",
    "isExpanded" : false,
    "star" : true
    },
    {
    "valeur" : "L'engagement envers l'excellence du service client",
    "description" : "La priorité donnée à la satisfaction des clients en offrant un excellent service client.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La flexibilité de l'horaire",
    "description" : "La capacité à offrir des horaires de travail flexibles pour les employés afin de répondre à leurs besoins personnels et professionnels.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La culture de l'apprentissage",
    "description" : "La promotion de la formation continue et du développement des compétences des employés.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "L'humilité",
    "description" : "La capacité à reconnaître ses erreurs et à travailler pour les corriger.",
    "isExpanded" : false,
    "star" : true
    },
    {
    "valeur" : "La volonté de prendre des risques",
    "description" : "La capacité à prendre des risques calculés pour atteindre les objectifs de l'entreprise.",
    "isExpanded" : false,
    "star" : true
    },
    {
    "valeur" : "La réactivité",
    "description" : "La capacité à répondre rapidement aux besoins des clients et à résoudre les problèmes.",
    "isExpanded" : false,
    "star" : true
    },
    {
    "valeur" : "La passion",
    "description" : "L'engagement envers la mission de l'entreprise et la passion pour ce qu'elle fait.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La loyauté",
    "description" : "La fidélité envers l'entreprise, les membres de l'équipe et les clients.",
    "isExpanded" : false,
    "star" : true
    },
    {
    "valeur" : "La responsabilité personnelle",
    "description" : "La prise de responsabilité individuelle pour les actions et les résultats.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La résilience",
    "description" : "La capacité à surmonter les obstacles et les défis.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La gestion du temps",
    "description" : "La capacité à gérer efficacement son temps pour atteindre les objectifs de l'entreprise.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "L'authenticité",
    "description" : "La promotion d'une culture d'entreprise authentique qui reflète les valeurs et la mission de l'entreprise.",
    "isExpanded" : false,
    "star" : true
    },
    {
    "valeur" : "La reconnaissance",
    "description" : "La reconnaissance des réalisations et des contributions des membres de l'équipe.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La diversité des talents",
    "description" : "La promotion de la diversité des talents et des compétences au sein de l'entreprise.",
    "isExpanded" : false,
    "star" : true
    },
    {
    "valeur" : "La collaboration",
    "description" : "La capacité à travailler en collaboration avec d'autres équipes et partenaires commerciaux.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La sécurité financière",
    "description" : "La gestion financière responsable et la sécurité financière pour les employés, les clients et les actionnaires.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La croissance personnelle",
    "description" : "La promotion de la croissance personnelle et professionnelle des employés.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La qualité",
    "description" : "La recherche de la qualité dans toutes les activités de l'entreprise, du produit ou du service jusqu'à l'expérience client.",
    "isExpanded" : false,
    "star" : true
    },
    {
    "valeur" : "L'innovation",
    "description" : "La capacité à créer des solutions innovantes pour résoudre les problèmes et à anticiper les tendances futures.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La transparence",
    "description" : "La promotion d'une communication ouverte et transparente avec les employés, les clients et les partenaires commerciaux.",
    "isExpanded" : false,
    "star" : true
    },
    {
    "valeur" : "La responsabilité sociale",
    "description" : "La prise en compte de l'impact de l'entreprise sur la société et l'environnement et la promotion d'une responsabilité sociale.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "L'agilité",
    "description" : "La capacité à s'adapter rapidement aux changements du marché et de l'environnement commercial.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La créativité",
    "description" : "La promotion d'une culture de la créativité pour générer de nouvelles idées et des solutions innovantes.",
    "isExpanded" : false,
    "star" : true
    },
    {
    "valeur" : "La durée de vie du produit",
    "description" : "La promotion de la durée de vie des produits et de l'utilisation de matériaux durables pour minimiser l'impact environnemental.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "L'orientation résultats",
    "description" : "La priorité donnée aux résultats et à l'atteinte des objectifs de l'entreprise.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La confidentialité",
    "description" : "La protection des données confidentielles des clients et des employés.",
    "isExpanded" : false,
    "star" : true
    },
    {
    "valeur" : "La responsabilité environnementale",
    "description" : "La prise en compte de l'impact de l'entreprise sur l'environnement et la promotion de pratiques durables.",
    "isExpanded" : false,
    "star" : false
    },
    {
    "valeur" : "La résolution de problèmes",
    "description" : "La capacité à résoudre rapidement les problèmes et les défis rencontrés par l'entreprise.",
    "isExpanded" : false,
    "star" : true
    },
  ]
}
