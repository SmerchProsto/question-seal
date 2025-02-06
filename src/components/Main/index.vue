<script setup lang="ts">
import Container from '../Container/index.vue';
import Contents from '../Contents/index.vue';
import FeatureColumnList from '../Feature/FeatureColumn/FeatureColumnList/index.vue';
import HeresyFeatures from '../HeresyFeatures/index.vue';
import Content from '../Contents/Content/index.vue';
import rocketIcon from '@/assets/rocket-icon.svg';
import graphicIcon from '@/assets/graphic-icon.svg';
import lampIcon from '@/assets/lamp-icon.svg';
import likeIcon from '@/assets/like-icon.svg';

import type { IFeatureColumn } from '../Feature/FeatureColumn/models/IFeatureColumn';
import type { IHeresyFeatures } from '../HeresyFeatures/models/IHeresyFeatures';

const featureColumns: Array<IFeatureColumn> = [
    { title: 'Цифры и факты', name: '1478', description: 'Год основания компании в европе' },
    { title: 'Цифры и факты', name: '3687', description: 'Клиентов довольных нами' },
];

const heresyFeatures: IHeresyFeatures = {
    title: 'Преимущества',
    contents: [
        {
            featureRows: [
                {
                    title: 'Преимущество', src: rocketIcon, alt: 'rocket', items: [
                        { description: 'Точность и технологии', isTitle: true },
                        { description: 'Наша уникальная технология анализа основана на вере и глубоких убеждениях, что гарантирует стабильность и достоверность результатов.' },
                        { description: 'Точность результата оценивается в 146% всеми Проповедниками нашего культа.' },
                    ]
                },
                {
                    title: 'Преимущество', src: graphicIcon, alt: 'graphic', items: [
                        { description: 'Держи свой уровень греха на нуле', isTitle: true },
                        { description: 'Установи уникальное приложение "Печать ереси" на свой смартфон и будь всегда в курсе своего состояния.' },
                        { description: 'Заходи в наш официальный интернет магазин, приобретай иконки и свечки, и снижай свой статус ереси online!' },
                    ]
                },
            ]
        },
        {
            featureRows: [
                {
                    title: 'Преимущество', src: lampIcon, alt: 'lamp', items: [
                        { description: 'Интеграция со всеми храмами', isTitle: true },
                        { description: 'Результаты проверки незамедоительно попадут в БД братства.' },
                        { description: 'Просто посетив ближайшую церковь, вам предоставят прайс лист с подхотящими именно Вам решениями для оцищения от ереси.' },
                    ]
                },
                {
                    title: 'Преимущество', src: likeIcon, alt: 'like', items: [
                        { description: 'Безопасность', isTitle: true },
                        { description: 'Ваши данные в надежных руках!' },
                        { description: 'Мы гарантируем безопасную передачу ваших личных данных в любые другие организации по нашему усмотрению.' },
                    ]
                },
            ]
        }
    ]
}
</script>
<template>
    <main>
        <Container>
            <Contents :custom-classes="['heresy-statiscs']">
                <h2 class="hidden">Положения</h2>
                <Content :custom-classes="['heresy-statiscs-text']">
                    <h2>Снижаем уровень ереси с XIII века.</h2>
                </Content>
                <Content>
                    <FeatureColumnList :items="featureColumns" />
                </Content>
            </Contents>
            <HeresyFeatures :contents="heresyFeatures.contents" title="Преимущества" />
        </Container>
    </main>
</template>

<style scoped>
main {
    color: #ffffff;
    background-image: url('@/assets/low-opacity-result.jpg');
    background-color: rgba(0, 0, 0, 0.8);
    background-size: cover;
    background-repeat: no-repeat;
    padding: 20px;
}

.heresy-statiscs {
    margin-bottom: 3em;
    padding-bottom: 4em;
    border-bottom: 1px solid #ffffff;
}
</style>

<style>
.heresy-statiscs .feature-column p {
    font-size: 1em;
}

.heresy-statiscs .feature-column b {
    font-size: 4em;
}

@media (max-width: 550px) {
    .heresy-statiscs .feature-column b {
        font-size: 2em;
    }

    .heresy-statiscs .feature-column p {
        font-size: 0.6em;
        padding-left: 0.7em;
    }
}

.heresy-statiscs .feature-column p {
    max-width: 50%;
}

.heresy-statiscs-text {
    padding-right: 1em;
}
</style>
