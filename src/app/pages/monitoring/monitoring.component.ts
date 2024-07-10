
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Community } from 'app/interfaces/Community.interface';
import { Department } from 'app/interfaces/Department.interface';
import { Municipality } from 'app/interfaces/Municipality.interface';
import { Question } from 'app/interfaces/Question.interface';
import { Req } from 'app/interfaces/Req.Interface';
import { CommunitiesService } from 'app/services/communities.service';
import { DepartmentService } from 'app/services/department.service';
import { MunicipalitiesService } from 'app/services/municipalities.service';
import { QuestionService } from 'app/services/question.service';
import { ServeysService } from 'app/services/serveys.service';
import swal from 'sweetalert2';

declare var $: any;

interface questionData {
    questionId: Number,
    descripcion: String,
    otherResponse: string,
    recommendation: Boolean,
    key: string,
    key2: string,
}

declare interface User {
    text?: string;
    email?: string; //  must be valid email format
    password?: string; // required, value must be equal to confirm password.
    confirmPassword?: string; // required, value must be equal to password.
    number?: number; // required, value must be equal to password.
    url?: string;
    idSource?: string;
    idDestination?: string;
}

@Component({
    selector: 'app-monitoring',
    templateUrl: './monitoring.component.html',
    styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent implements OnInit {

    departments: Department[] = [];
    municipalities: Municipality[] = [];
    communities: Community[] = [];
    question: Question[] = [];
    dateMonitory: string = "";
    dataGroup: questionData[] = [];
    loadingQuestions: boolean = true;
    generalRecommendation: string = "";
    type: FormGroup;
    formTbl1: FormGroup;
    loading: boolean = true;


    formPoll: FormGroup;

    communityId: number = 0;
    municipalityId: number = 0;
    departmentId: number = 0;

    constructor(
        private readonly deparmentService: DepartmentService,
        private readonly municipalitiesService: MunicipalitiesService,
        private readonly communitiesService: CommunitiesService,
        private readonly serveyService: ServeysService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {

    }
    public typeValidation: User;


    ngOnInit() {

        this.type = this.formBuilder.group({

            departmentId: [0, Validators.required],
            municipalityId: [0, Validators.required],

            //form1
            communityId: [0, Validators.required],
            famPriorizadas: [0, Validators.required],

            //form2
            ejecutadas: [0, Validators.required],
            programadas: [0, Validators.required],

            //form3
            madre: [0, Validators.required],
            padre: [0, Validators.required],
            abuela: [0, Validators.required],
            total: [0, Validators.required],

            //form4
            antes: [0, Validators.required],
            despues: [0, Validators.required],
            semanas: [0, Validators.required],

            //form5
            hospital: ["", Validators.required],
            comunidad: ["", Validators.required],
            consulta: [0, Validators.required],

            //form6
            sinLactancia: [0, Validators.required],
            conLactancia: [0, Validators.required],

            //form7
            rango1: [0, Validators.required],
            rango2: [0, Validators.required],
            rango3: [0, Validators.required],
            masculino: [0, Validators.required],
            femenino: [0, Validators.required],

            //form8
            noInscritos: [0, Validators.required],
            inscritos: [0, Validators.required],

            //form9
            hepatitis: [0, Validators.required],
            bcg: [0, Validators.required],
            pentavalente: [0, Validators.required],
            rotavirus: [0, Validators.required],
            srp: [0, Validators.required],
            nuemococo: [0, Validators.required],

            //form10
            lencas: [0, Validators.required],
            tolupan: [0, Validators.required],
            chortis: [0, Validators.required],
            mestizo: [0, Validators.required],
            tawaka: [0, Validators.required],
            garifuna: [0, Validators.required],
            otros: [0, Validators.required],

            //form11
            normal: [0, Validators.required],
            moderada: [0, Validators.required],
            severo: [0, Validators.required],
            otro: [0, Validators.required],

            //form12
            noDesnutridos: [0, Validators.required],
            desnutridos: [0, Validators.required],

            //form13
            usoGuia: [0, Validators.required],
            nousoGuia: [0, Validators.required],

            //form14
            intervino: [0, Validators.required],
            noIntervino: [0, Validators.required],

            //form15
            conSeguimiento: [0, Validators.required],
            sinSeguimiento: [0, Validators.required],

            //form16
            desarrolladas: [0, Validators.required],
            noDesarrolladas: [0, Validators.required],
            supervisor: ["", Validators.required],
        });
        // you can also use the nav-pills-[blue | azure | green | orange | red] for a different color of wizard
        // Code for the Validator
        var $validator = $('.card-wizard form').validate({
            rules: {
                departmentId: {
                    required: true,
                    minlength: 1
                },
                municipalityId: {
                    required: true,
                    minlength: 1
                },
                communityId: {
                    required: true,
                    minlength: 1
                },
                famPriorizadas: {
                    required: true,
                    minlength: 1,
                },
                ejecutadas: {
                    required: true,
                    minlength: 1,
                },
                programadas: {
                    required: true,
                    minlength: 1,
                },
                madre: {
                    required: true,
                    minlength: 1,
                },
                padre: {
                    required: true,
                    minlength: 1,
                },
                abuela: {
                    required: true,
                    minlength: 1,
                },
                total: {
                    required: true,
                    minlength: 1,
                },
                antes: {
                    required: true,
                    minlength: 1,
                },
                despues: {
                    required: true,
                    minlength: 1,
                },
                hospital: {
                    required: true,
                    minlength: 1,
                },
                comunidad: {
                    required: true,
                    minlength: 1,
                },
                consulta: {
                    required: true,
                    minlength: 1,
                },
                conLactancia: {
                    required: true,
                    minlength: 1,
                },
                sinLactancia: {
                    required: true,
                    minlength: 1,
                },
                rango1: {
                    required: true,
                    minlength: 1,
                },
                rango2: {
                    required: true,
                    minlength: 1,
                },
                rango3: {
                    required: true,
                    minlength: 1,
                },
                femenino: {
                    required: true,
                    minlength: 1,
                },
                masculino: {
                    required: true,
                    minlength: 1,
                },
                noInscritos: {
                    required: true,
                    minlength: 1,
                },
                inscritos: {
                    required: true,
                    minlength: 1,
                },
                pentavalente: {
                    required: true,
                    minlength: 1,
                },
                hepatitis: {
                    required: true,
                    minlength: 1,
                },
                srp: {
                    required: true,
                    minlength: 1,
                },
                bcg: {
                    required: true,
                    minlength: 1,
                },
                rotavirus: {
                    required: true,
                    minlength: 1,
                },
                nuemococo: {
                    required: true,
                    minlength: 1,
                },
                lencas: {
                    required: true,
                    minlength: 1,
                },
                chortis: {
                    required: true,
                    minlength: 1,
                },
                tawaka: {
                    required: true,
                    minlength: 1,
                },
                otros: {
                    required: true,
                    minlength: 1,
                },
                tolupan: {
                    required: true,
                    minlength: 1,
                },
                mestizo: {
                    required: true,
                    minlength: 1,
                },
                garifuna: {
                    required: true,
                    minlength: 1,
                },
                normal: {
                    required: true,
                    minlength: 1,
                },
                moderada: {
                    required: true,
                    minlength: 1,
                },
                severo: {
                    required: true,
                    minlength: 1,
                },
                otro: {
                    required: true,
                    minlength: 1,
                },
                desnutridos: {
                    required: true,
                    minlength: 1,
                },
                noDesnutridos: {
                    required: true,
                    minlength: 1,
                },
                usoGuia: {
                    required: true,
                    minlength: 1,
                },
                nousoGuia: {
                    required: true,
                    minlength: 1,
                },
                intervino: {
                    required: true,
                    minlength: 1,
                },
                noIntervino: {
                    required: true,
                    minlength: 1,
                },
                conSeguimiento: {
                    required: true,
                    minlength: 1,
                },
                sinSeguimiento: {
                    required: true,
                    minlength: 1,
                },
                desarrolladas: {
                    required: true,
                    minlength: 1,
                },
                noDesarrolladas: {
                    required: true,
                    minlength: 1,
                },
                supervisor: {
                    required: true,
                    minlength: 1,
                }

            },

            highlight: function (element) {
                $(element).parent().addClass('has-error').removeClass('has-success');
            },
            success: function (element) {
                $(element).parent().addClass('has-success').removeClass('has-error');
            }
        });

        $('#wizardCard').bootstrapWizard({
            tabClass: 'nav nav-pills',
            nextSelector: '.btn-next',
            previousSelector: '.btn-back',
            lastSelector: '.btn-finish',
            onNext: function (tab, navigation, index) {
                var $valid = $('.card-wizard form').valid();
                if (!$valid) {
                    $validator.focusInvalid();
                    return false;
                }
            },
            onInit: function (tab, navigation, index) {

                //check number of tabs and fill the entire row
                var $total = navigation.find('li').length;
                var $width = 100 / $total;

                var $display_width = $(document).width();

                if ($display_width < 600 && $total > 3) {
                    $width = 50;
                }

                navigation.find('li').css('width', $width + '%');
            },
            onTabClick: function (tab, navigation, index) {
                // Disable the posibility to click on tabs
                return false;
            },
            onTabShow: function (tab, navigation, index) {
                var $total = navigation.find('li').length;
                var $current = index + 1;

                var wizard = navigation.closest('.card-wizard');

                // If it's the last tab then hide the last button and show the finish instead
                if ($current >= $total) {
                    $(wizard).find('.btn-next').hide();
                    $(wizard).find('.btn-finish').show();
                } else if ($current == 1) {
                    $(wizard).find('.btn-back').hide();
                } else {
                    $(wizard).find('.btn-back').show();
                    $(wizard).find('.btn-next').show();
                    $(wizard).find('.btn-finish').hide();
                }
            },
            onLast: function (tab, navigation, index) {
            }
        });

        this.getDeparments();

        this.loading = false;

    }

    getDeparments() {
        this.deparmentService.getAll().subscribe(((res: any) => {
            //console.log(res);
            this.departments = res.data;
        }));
    }

    getMunicipalitiesByDeparment(event: any) {
        let departmentId: number = event.target.value;
        this.communities = [];
        this.municipalities = [];

        this.departmentId = Number(departmentId);

        this.municipalitiesService.getByDepartmentId(departmentId).subscribe(((res: any) => {
            this.municipalities = res.data;
        }));
    }

    getCommunities(event: any) {
        let municipalityId: number = event.target.value;

        this.municipalityId = Number(municipalityId);

        this.communitiesService.getByCommunityByMunicipalityId(municipalityId).subscribe(((res: any) => {
            this.communities = res.data;
        }));
    }

    getValueForm(controlName: string): any {
        return this.type.get(controlName)?.value
    }

    onSubmitTbl1() {

        let req: Req = {

            monitoreo: {
                communityId: Number(this.getValueForm('communityId')), 
                famPriorizadas : this.getValueForm('famPriorizadas')
            },
            form2: {
                ejecutadas: this.getValueForm('ejecutadas'),
                programadas: this.getValueForm('programadas'),
            },
            form3: {
                abuela: this.getValueForm('abuela'),
                madre: this.getValueForm('madre'),
                padre: this.getValueForm('padre'),
                total: this.getValueForm('total'),
            },
            form4: {
                antes: this.getValueForm('antes'),
                despues: this.getValueForm('despues'),
                semanas: this.getValueForm('semanas'),
            },
            form5: {
                comunidad: this.getValueForm('comunidad'),
                consulta: this.getValueForm('consulta'),
                hospital: this.getValueForm('hospital'),
            },
            form6: {
                conLactancia: this.getValueForm('conLactancia'),
                sinLactancia: this.getValueForm('sinLactancia'),
            },
            form7: {
                femenino: this.getValueForm('femenino'),
                masculino: this.getValueForm('abuela'),
                rango1: this.getValueForm('rango1'),
                rango2: this.getValueForm('rango2'),
                rango3: this.getValueForm('rango3'),
            },
            form8: {
                inscritos: this.getValueForm('inscritos'),
                noInscritos: this.getValueForm('noInscritos'),
            },
            form9: {
                bcg: this.getValueForm('bcg'),
                hepatitis: this.getValueForm('hepatitis'),
                nuemococo: this.getValueForm('nuemococo'),
                pentavalente: this.getValueForm('pentavalente'),
                rotavirus: this.getValueForm('rotavirus'),
                srp: this.getValueForm('srp'),
            },
            form10: {
                chortis: this.getValueForm('chortis'),
                garifuna: this.getValueForm('garifuna'),
                lencas: this.getValueForm('lencas'),
                mestizo: this.getValueForm('mestizo'),
                otros: this.getValueForm('otros'),
                tawaka: this.getValueForm('tawaka'),
                tolupan: this.getValueForm('tolupan'),
            },
            form11: {
                moderada: this.getValueForm('moderada'),
                normal: this.getValueForm('normal'),
                otro: this.getValueForm('otro'),
                severo: this.getValueForm('severo'),
            },
            form12: {
                desnutridos: this.getValueForm('desnutridos'),
                noDesnutridos: this.getValueForm('noDesnutridos')
            },
            form13: {
                nousoGuia: this.getValueForm('nousoGuia'),
                usoGuia: this.getValueForm('usoGuia'),
            },
            form14: {
                intervino: this.getValueForm('intervino'),
                noIntervino: this.getValueForm('noIntervino'),
            },
            form15: {
                conSeguimiento: this.getValueForm('conSeguimiento'),
                sinSeguimiento: this.getValueForm('sinSeguimiento'),
            },

            form16: {
                desarrolladas: this.getValueForm('desarrolladas'),
                noDesarrolladas: this.getValueForm('noDesarrolladas'),
                supervisor: this.getValueForm('supervisor'),
            }

        };

        console.log(req)

        this.serveyService.create(req).subscribe((response: any) => {
            console.log(response)

            if (response.ok) {

                swal.fire("Buen Trabajo", "Datos guardado con exito", "success");

                this.router.navigateByUrl('/dashboard');
            }
        });

    }


}
